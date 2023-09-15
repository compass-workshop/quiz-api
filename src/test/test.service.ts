import { Injectable, NotFoundException } from '@nestjs/common';
import { Test } from './dto/test.dto';
import { DBClientFactory } from 'src/db-client/db-client.factory';

@Injectable()
export class TestService {
  dbClient: any;
  constructor(private dbClientFactory: DBClientFactory) {
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
}
