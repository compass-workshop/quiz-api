import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Test } from './dto/test.dto';
import { SubmittedTestDto } from './dto/submitted-test.dto';
import { TestProducerService } from './services/test-producer.service';
import { DBClientFactory } from 'src/db-client/db-client.factory';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);
  dbClient: any;

  constructor(
    private testProducerService: TestProducerService,
    private dbClientFactory: DBClientFactory,
    private userService: UserService,
  ) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  async getTests(): Promise<Test[]> {
    const tests = await this.dbClient.findAllTest();
    return tests.map((test) => ({
      id: test.id,
      name: test.name,
    }));
  }

  async getTest(id: string): Promise<Test> {
    const test = await this.dbClient.findTest(id);
    if (!test) throw new NotFoundException('Test not found');
    return {
      ...test,
      questions: test.questions.map((question) => {
        const { answer, ...questionWithoutAnswer } = question;
        return questionWithoutAnswer;
      }),
    };
  }

  // Post data to submit test topic
  async submitTest(
    testData: SubmittedTestDto,
    userId: string,
    testId: string,
  ): Promise<any> {
    try {
      return await this.testProducerService.createSubmitTestKafkaRecord(
        testData,
        userId,
        testId,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async reviewTest(userId: string, testId: string): Promise<any> {
    try {
      const [test, userAttemptedTest] = await Promise.all([
        this.dbClient.findTest(testId),
        this.userService.getAttemptedTest(userId, testId),
      ]);

      userAttemptedTest['EVALUATED_ANSWERS'] = userAttemptedTest[
        'EVALUATED_ANSWERS'
      ].map((answer, index) => {
        answer.options = test.questions[index]?.options || [];
        return answer;
      });

      return userAttemptedTest;
    } catch (error) {
      throw error;
    }
  }
}
