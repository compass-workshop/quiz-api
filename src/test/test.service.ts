import { Injectable, NotFoundException } from '@nestjs/common';
import { Test } from './dto/test.dto';
import { DbClientFactory } from 'src/factory/dbClient.factory';

@Injectable()
export class TestService {
  dbClient: any;
  constructor(private dbClientFactory: DbClientFactory) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  async getTests(): Promise<Test[]> {
    const tests = await this.dbClient.findMany('test', {
      include: { questions: true },
    });
    return tests;
  }

  async getTest(id: string): Promise<Test> {
    const test = await this.dbClient.findUnique('test', {
      where: { id },
      include: { questions: true },
    });
    if (!test) throw new NotFoundException('Test not found');
    return test;
  }
}
