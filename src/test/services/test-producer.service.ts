import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistryService } from '../../providers/kafka/registry.service';
import { SubmittedTestDto, SubmittedAnswer } from '../dto/submitted-test.dto';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestProducerService {
  private readonly logger = new Logger(TestProducerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
    private readonly producerService: ProducerService,
  ) {}

  async createSubmitTestKafkaRecord(
    submittedTestData: SubmittedTestDto,
    userId: string,
    testId: string,
  ) {
    const { topics } = this.configService.get('kafka');

    // Need to discuss
    const key = `${userId}`;

    const submittedTestRecordData = this.generateSubmitTestKafkaRecord(
      submittedTestData,
      userId,
      testId,
    );

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
  generateSubmitTestKafkaRecord(submittedTestData, userId, testId) {
    return {
      fact_id: uuidv4(),
      fact_name: 'TestSubmitted',
      timestamp: submittedTestData.submittedAt,
      test_id: testId,
      submitted_answers: this.getSubmittedAnswer(
        submittedTestData.submittedAmswers,
      ),
      user: {
        id: userId,
        email: submittedTestData.email,
      },
    };
  }

  getSubmittedAnswer(submittedAmswers: SubmittedAnswer[]) {
    return submittedAmswers.map((submittedAmswer: SubmittedAnswer) => ({
      question_id: submittedAmswer.questionId,
      question_text: submittedAmswer.questionText,
      answer: submittedAmswer.selectedAnswer,
    }));
  }
}
