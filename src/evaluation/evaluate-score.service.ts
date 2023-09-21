import { Injectable, NotFoundException } from '@nestjs/common';
import {
  SubmittedAnswer,
  SubmittedTest,
} from './interfaces/submitted-test.interface';
import { DBClientFactory } from 'src/db-client/db-client.factory';
import { Test } from 'src/test/dto/test.dto';
import { Question } from 'src/test/dto/question.dto';
import { EvaluationProducerService } from './producer/evaluation-producer.service';
import {
  EvaluatedAnswer,
  EvaluatedTestStatus,
} from './interfaces/evaluated-test.interface';
import { TestStatus, QuestionStatus } from './enums/test.enum';

@Injectable()
export class EvaluateScoreService {
  dbClient: any;

  constructor(
    private dbClientFactory: DBClientFactory,
    private evaluationProducerService: EvaluationProducerService,
  ) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  async evaluateTest(userTest: SubmittedTest) {
    try {
      if (!userTest) {
        throw new NotFoundException('Submitted test details not found');
      }

      const testId: string = userTest?.test_id;
      const testDetails: Test = await this.getTest(testId);
      const evaluatedAnswers: EvaluatedAnswer[] = [];
      let totalMaxScore = 0;
      let totalRawScore = 0;

      userTest?.submitted_answers?.forEach(
        (submittedAnswer: SubmittedAnswer) => {
          const currQuestion: Question = testDetails?.questions?.find(
            (question) => question?.id === submittedAnswer?.question_id,
          );

          if (!currQuestion) {
            throw new NotFoundException('Question not found in test in DB');
          }
          const marksObtained = this.getScore(currQuestion, submittedAnswer);
          const evaluatedAnswer: EvaluatedAnswer = {
            question_id: submittedAnswer?.question_id,
            question_text: currQuestion?.text,
            correct_answer: currQuestion?.answer,
            submitted_answer: submittedAnswer?.answer,
            max_score: currQuestion?.maxScore,
            raw_score: marksObtained,
            status: this.findQuestionStatus(
              currQuestion?.maxScore,
              marksObtained,
            ),
          };
          totalMaxScore += evaluatedAnswer.max_score;
          totalRawScore += evaluatedAnswer.raw_score;
          evaluatedAnswers.push(evaluatedAnswer);
        },
      );

      const status = this.findTestStatus(totalMaxScore, totalRawScore);
      const testStatus: EvaluatedTestStatus = {
        max_score: totalMaxScore,
        raw_score: totalRawScore,
        status,
      };
      this.evaluationProducerService.createEvaluatedTestKafkaRecord(
        evaluatedAnswers,
        userTest,
        testStatus,
      );
    } catch (error) {
      console.log('Test can not be evaluated', error);
    }
  }

  async getTest(id: string): Promise<Test> {
    const test = await this.dbClient.findTest(id);
    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  getScore(currQuestion: Question, submittedAnswer: SubmittedAnswer): number {
    return submittedAnswer.answer === currQuestion.answer ? 1 : 0;
  }

  getSelectedOption(
    currQuestion: Question,
    submittedAnswer: SubmittedAnswer,
  ): string {
    const index = currQuestion?.options?.findIndex(
      (option) => option === submittedAnswer?.answer,
    );

    if (index > -1) {
      return String.fromCharCode(65 + index);
    }
    throw new NotFoundException('Selected option not found in DB');
  }

  findTestStatus(maxScore: number, rawScore: number): string {
    if (rawScore > maxScore / 2) return TestStatus.PASSED;
    return TestStatus.FAILED;
  }

  findQuestionStatus(maxScore: number, rawScore: number): string {
    if (maxScore === rawScore) return QuestionStatus.CORRECT;
    return QuestionStatus.INCORRECT;
  }
}
