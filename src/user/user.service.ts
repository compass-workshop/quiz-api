import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DBClientFactory } from 'src/db-client/db-client.factory';
import { KsqldbService } from 'src/providers/ksqldb/ksqldb.service';

@Injectable()
export class UserService {
  dbClient: any;

  constructor(
    private prismaService: PrismaService,
    private dbClientFactory: DBClientFactory,
    private ksqldbService: KsqldbService,
  ) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  //this will get data from latest test result table
  // query will be select * from <Table> where userId: userId
  async getAttemptedTests(userId: string): Promise<any> {
    try {
      const responseFromKSQL = await this.ksqldbService.runQuery({
        ksql: `select * from USER_ANALYTICS where user.id = ${userId};`,
        streamProperties: {},
      });

      return responseFromKSQL;
    } catch (error) {
      throw new Error(error);
    }
  }
}
