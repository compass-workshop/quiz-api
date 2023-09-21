import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';
import { SubmittedTest } from '../interfaces/submitted-test.interface';
import {
  EvaluatedTestMsg,
  EvaluatedAnswer,
  EvaluatedTestStatus,
} from '../interfaces/evaluated-test.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EvaluationProducerService {
  private readonly logger = new Logger(EvaluationProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly producerService: ProducerService,
  ) {}

  async createEvaluatedTestKafkaRecord(
    evaluatedAnswers: EvaluatedAnswer[],
    userTest: SubmittedTest,
    testStatus: EvaluatedTestStatus,
  ): Promise<void> {
    const { topics } = this.configService.get('kafka');

    const key = `${userTest?.user?.id}`;

    const evaluatedTesRecordData = this.generateEvaluatedTestKafkaRecord(
      evaluatedAnswers,
      userTest,
      testStatus,
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
    evaluatedAnswers: EvaluatedAnswer[],
    userTest: SubmittedTest,
    testStatus: EvaluatedTestStatus,
  ): EvaluatedTestMsg {
    return {
      fact_id: uuidv4(),
      fact_name: 'TestSubmitted',
      timestamp: userTest.timestamp,
      test_id: userTest.test_id,
      raw_score: testStatus.raw_score,
      max_score: testStatus.max_score,
      status: testStatus.status,
      evaluated_answers: evaluatedAnswers,
      user: userTest.user,
    };
  }
}
