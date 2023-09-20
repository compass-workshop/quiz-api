import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';
import { SubmittedTest } from '../interfaces/submitted-test.interface';
import {
  EvaluatedTestMsg,
  Evaluation,
} from '../interfaces/evaluated-test.interface';

@Injectable()
export class EvaluationProducerService {
  private readonly logger = new Logger(EvaluationProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly producerService: ProducerService,
  ) {}

  async createEvaluatedTestKafkaRecord(
    evaluation: Evaluation,
    userTest: SubmittedTest,
  ): Promise<void> {
    const { topics } = this.configService.get('kafka');

    const key = `${userTest?.testId}___${userTest?.user?.id}`;

    const evaluatedTesRecordData = this.generateEvaluatedTestKafkaRecord(
      evaluation,
      userTest,
    );

    const encodedMessage = await this.registryService.encode(
      `${topics?.evaluatedTestTopic?.name}-value`,
      evaluatedTesRecordData,
    );

    this.producerService.produce({
      topic: topics?.evaluatedTestTopic?.name,
      messages: [
        {
          key: key,
          value: encodedMessage,
        },
      ],
    });

    this.logger.log(
      'Successfully produced message to ' +
        topics?.evaluatedTestTopic?.name +
        ' having key ' +
        key,
    );
  }

  generateEvaluatedTestKafkaRecord(
    evaluation: Evaluation,
    userTest: SubmittedTest,
  ) {
    return {
      fact_id: 'fact1',
      fact_name: 'fact name 1',
      timestamp: 123,
      test_id: '2c9d7877-2e96-47b8-8fc8-6488510bddf8',
      raw_score: 1,
      max_score: 5,
      status: 'FAILED',
      evaluated_answers: [
        {
          question_id: 'question1',
          question_text: 'What is the question?',
          correct_answer: 'correct answer',
          submitted_answer: 'submitted answer',
          raw_score: 1,
          max_score: 1,
          status: 'correct',
        },
        {
          question_id: 'question1',
          question_text: 'What is the question?',
          correct_answer: 'correct answer',
          submitted_answer: 'submitted answer',
          raw_score: 1,
          max_score: 1,
          status: 'correct',
        },
        {
          question_id: 'question1',
          question_text: 'What is the question?',
          correct_answer: 'correct answer',
          submitted_answer: 'submitted answer',
          raw_score: 1,
          max_score: 1,
          status: 'correct',
        },
        {
          question_id: 'question1',
          question_text: 'What is the question?',
          correct_answer: 'correct answer',
          submitted_answer: 'submitted answer',
          raw_score: 1,
          max_score: 1,
          status: 'correct',
        },
        {
          question_id: 'question1',
          question_text: 'What is the question?',
          correct_answer: 'correct answer',
          submitted_answer: 'submitted answer',
          raw_score: 1,
          max_score: 1,
          status: 'correct',
        },
      ],
      user: {
        id: 'user1',
        email: 'user@user.com',
      },
    };
  }
}
