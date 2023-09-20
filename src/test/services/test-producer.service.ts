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
      fact_id: 'fact1',
      fact_name: 'fact name 1',
      timestamp: 123456,
      test_id: '2c9d7877-2e96-47b8-8fc8-6488510bddf8',
      submitted_answers: [
        {
          question_id: 'question1',
          question_text: 'What is the question',
          answer: 'answer1',
        },
        {
          question_id: 'question2',
          question_text: 'What is the question',
          answer: 'answer2',
        },
        {
          question_id: 'question3',
          question_text: 'What is the question',
          answer: 'answer3',
        },
        {
          question_id: 'question4',
          question_text: 'What is the question',
          answer: 'answer4',
        },
        {
          question_id: 'question5',
          question_text: 'What is the question',
          answer: 'answer5',
        },
      ],
      user: {
        id: submittedTestData.userId,
        email: submittedTestData.email,
      },
    };
  }
}
