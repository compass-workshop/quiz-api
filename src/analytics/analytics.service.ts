import { Injectable, BadRequestException } from '@nestjs/common';
import { Analytics } from './dto/analytics.dto';
import { KsqldbService } from 'src/providers/ksqldb/ksqldb.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  dbClient: any;
  constructor(
    private readonly ksqldbService: KsqldbService,
    private readonly configService: ConfigService,
  ) {}

  async getAnalytics(userId: string): Promise<Analytics | object> {
    const { userAnalyticsTable } = this.configService.get('ksqldb');
    const queryResponse = await this.ksqldbService.runQuery({
      ksql: `SELECT * FROM  ${userAnalyticsTable} WHERE  USERID = '${userId}';`,
      streamProperties: {},
    });

    if (queryResponse?.length < 2) {
      throw new BadRequestException('No analytics found for this user');
    }

    // Generate meaningful data from Ksqldb query
    const schema = queryResponse[0].header.schema;
    const columnNames = schema
      .match(/`([^`]+)`/g)
      .map((match) => match.replace(/`/g, ''));

    // Extract and map rows to meaningful objects
    const firstRowFound = queryResponse.slice(1).find((rowData) => rowData.row);
    const rowObject = {};
    if (firstRowFound) {
      const values = firstRowFound.row.columns;

      for (let i = 0; i < columnNames.length; i++) {
        rowObject[columnNames[i]] = values[i];
      }
    }
    return rowObject;
  }
}
