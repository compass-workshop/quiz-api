import { Injectable, NotFoundException } from '@nestjs/common';
import { Answer, SubmittedTest } from './interfaces/submitted-test.interface';
import { DBClientFactory } from 'src/db-client/db-client.factory';
import { Test } from 'src/test/dto/test.dto';
import { Question } from 'src/test/dto/question.dto';
import { EvaluationProducerService } from './producer/evaluation-producer.service';
import {
  EvaluatedAnswer,
  Evaluation,
} from './interfaces/evaluated-test.interface';

enum Status {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

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

      const testId: string =
        '09dd6726-55d0-4224-93fe-880f2cb5efef' || userTest?.testId;
      const testDetails: Test = await this.getTest(testId);
      const evaluatedAnswers: EvaluatedAnswer[] = [];
      let rawScore = 0;

      userTest?.answers?.forEach((answer: Answer) => {
        const currQuestion: Question = testDetails?.questions?.find(
          (question) => question?.id === answer?.questionId,
        );

        if (!currQuestion) {
          throw new NotFoundException('Question not found in DB');
        }
        const evaluatedAnswer: EvaluatedAnswer = {
          questionId: answer?.questionId,
          questionScore: this.getScore(currQuestion, answer),
          selectedAnswer: this.getSelectedOption(currQuestion, answer),
        };
        rawScore += evaluatedAnswer.questionScore;
        evaluatedAnswers.push(evaluatedAnswer);
      });

      const maxScore: number = userTest?.answers?.length;
      const evaluation: Evaluation = {
        maxScore,
        rawScore,
        status: this.findStatus(maxScore, rawScore),
        evaluatedAnswers,
      };
      this.evaluationProducerService.createEvaluatedTestKafkaRecord(
        evaluation,
        userTest,
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

  getScore(currQuestion: Question, answer: Answer): number {
    return answer.selectedAnswer === currQuestion.answer ? 1 : 0;
  }

  getSelectedOption(currQuestion: Question, answer: Answer): string {
    const index = currQuestion?.options?.findIndex(
      (option) => option === answer?.selectedAnswer,
    );

    if (index > -1) {
      return String.fromCharCode(65 + index);
    }
    throw new NotFoundException('Selected option not found in DB');
  }

  findStatus(maxScore: number, rawScore: number): string {
    if (rawScore > maxScore / 2) return Status.PASSED;
    return Status.FAILED;
  }
}
