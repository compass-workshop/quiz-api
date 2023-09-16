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
  ): EvaluatedTestMsg {
    return {
      evaluation: evaluation,
      testId: userTest?.testId,
      submittedAt: userTest?.submittedAt.toString(),
      user: userTest?.user,
    };
  }
}
