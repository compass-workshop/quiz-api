import { Body, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from './dto/test.dto';
// import { Test } from './entities/test.entity';
import { SubmittedTestDto } from './dto/submitted-test.dto';
import { TestProducerService } from './services/test-producer.service';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  constructor(
    private prismaService: PrismaService,
    private testProducerService: TestProducerService,
  ) {}

  async getTests(): Promise<Test[]> {
    try {
      // const tests = await this.prismaService.test.findMany({
      //   include: {
      //     questions: true,
      //   },
      // });
      const tests = [];
      return tests;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTest(id: string): Promise<Test> {
    try {
      // const test = await this.prismaService.test.findUnique({
      //   where: { id },
      //   include: {
      //     questions: true,
      //   },
      // });
      const test = '';
      if (!test) throw new NotFoundException('Test not found');
      return test;
    } catch (error) {
      throw new Error(error);
    }
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
