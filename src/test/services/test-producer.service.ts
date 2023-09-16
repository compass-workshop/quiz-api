import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistryService } from '../../providers/kafka/registry.service';
import { SubmittedTestDto } from '../dto/submitted-test.dto';
import { ProducerService } from 'src/providers/kafka/producer.service';

@Injectable()
export class TestProducerService {
  private readonly logger = new Logger(TestProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly producerService: ProducerService,
  ) {}

  async createSubmitTestKafkaRecord(submittedTestData: SubmittedTestDto) {
    const { topics } = this.configService.get('kafka');

    // Need to discuss
    const key = `${submittedTestData.testId}___${submittedTestData.userId}`;

    const submittedTestRecordData =
      this.generateSubmitTestKafkaRecord(submittedTestData);

    const encodedMessage = await this.registryService.encode(
      `${topics?.submittedTestTopic?.name}-value`,
      submittedTestRecordData,
    );

    this.producerService.produce({
      topic: topics?.submittedTestTopic?.name,
      messages: [
        {
          key: key,
          value: encodedMessage,
        },
      ],
    });

    this.logger.log(
      'Successfully produced message to ' +
        topics?.submittedTestTopic?.name +
        ' having key ' +
        key,
    );
  }

  // construct submit-test kafka record
  generateSubmitTestKafkaRecord(submittedTestData) {
    return {
      answers: submittedTestData.submittedAnswers,
      testId: submittedTestData.testId,
      submittedAt: submittedTestData.submittedAt,
      user: {
        id: submittedTestData.userId,
        email: submittedTestData.email,
      },
    };
  }
}
