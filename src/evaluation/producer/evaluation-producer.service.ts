import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';
import { SubmittedTest } from '../interfaces/submitted-test.interface';

@Injectable()
export class EvaluationProducerService {
  private readonly logger = new Logger(EvaluationProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly producerService: ProducerService,
  ) {}

  async createSubmitTestKafkaRecord(evaluation, userTest: SubmittedTest) {
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

  // construct submit-test kafka record
  generateEvaluatedTestKafkaRecord(evaluation, userTest: SubmittedTest) {
    return {
      evaluation: evaluation,
      testId: userTest?.testId,
      submittedAt: userTest?.submittedAt.toString(),
      user: userTest?.user,
    };
  }
}
