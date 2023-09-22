import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { DBClientFactory } from 'src/db-client/db-client.factory';
import { KsqldbService } from 'src/providers/ksqldb/ksqldb.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  dbClient: any;
  private readonly logger = new Logger(UserService.name);
  constructor(
    private dbClientFactory: DBClientFactory,
    private ksqldbService: KsqldbService,
    private readonly configService: ConfigService,
  ) {
    this.dbClient = this.dbClientFactory.getDatabaseClient('Prisma');
  }

  async getUserTests(userId: string): Promise<any> {
    try {
      const { userLatestResultTable } = this.configService.get('ksqldb');
      const tests = await this.dbClient.findAllTest();
      const responseFromKSQL = await this.ksqldbService.runQuery({
        ksql: `select * from ${userLatestResultTable} where USER_ID = '${userId}';`,
        streamProperties: {},
      });
      const attemtedTests = responseFromKSQL
        .slice(1)
        .map((latestTestData) => latestTestData.row.columns[1]);

      return tests.map((test) => {
        const isAttempted = attemtedTests.includes(test.id);
        return {
          id: test.id,
          name: test.name,
          isAttempted,
        };
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async getAttemptedTest(userId: string, testId: string): Promise<any> {
    try {
      const { userLatestResultTable } = this.configService.get('ksqldb');
      const responseFromKSQL = await this.ksqldbService.runQuery({
        ksql: `select * from ${userLatestResultTable} where USER_ID = '${userId}' and TEST_ID = '${testId}';`,
        streamProperties: {},
      });
      if (responseFromKSQL?.length < 2) {
        throw new BadRequestException('No analytics found for this user');
      }

      const schema = responseFromKSQL[0].header.schema;
      const columnNames = schema
        .match(/`([^`]+)`/g)
        .map((match) => match.replace(/`/g, ''));

      const firstRowFound = responseFromKSQL
        .slice(1)
        .find((rowData) => rowData.row);
      const rowObject: any = {};
      if (firstRowFound) {
        const values = firstRowFound.row.columns;

        for (let i = 0; i < columnNames.length; i++) {
          rowObject[columnNames[i]] = values[i];
        }
      }

      return {
        ...rowObject,
        EVALUATED_ANSWERS: rowObject.EVALUATED_ANSWERS.map(
          (evaluatedAnswers) => {
            const { CORRECT_ANSWER, ...evaluationWithoutAnswer } =
              evaluatedAnswers;
            return evaluationWithoutAnswer;
          },
        ),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
