import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from './dto/test.dto';
// import { Test } from './entities/test.entity';
import { SubmittedTestDto } from './dto/submitted-test.dto';
import { TestProducerService } from './services/test-producer.service';
import { DBClientFactory } from 'src/db-client/db-client.factory';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);
  dbClient: any;

  constructor(
    private prismaService: PrismaService,
    private testProducerService: TestProducerService,
    private dbClientFactory: DBClientFactory,
  ) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  async getTests(): Promise<Test[]> {
    const tests = await this.dbClient.findAllTest();
    return tests;
  }

  async getTest(id: string): Promise<Test> {
    const test = await this.dbClient.findTest(id);
    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  // Post data to submit test topic
  async submitTest(testData: SubmittedTestDto): Promise<any> {
    try {
      return this.testProducerService.createSubmitTestKafkaRecord(testData);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
