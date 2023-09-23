import { Injectable } from '@nestjs/common';
import { KsqldbService } from 'src/providers/ksqldb/ksqldb.service';

@Injectable()
export class AnalyticsStreamService {
  constructor(private readonly ksqldbService: KsqldbService) {}

  async insertDataToUserAnalyticsStream(streamData) {
    const responseFromKSQL = await this.ksqldbService.executeQuery({
      ksql: `INSERT INTO USER_ANALYTICS VALUES('${streamData.USERID}', '${streamData.TESTID}', ${streamData.SCORE});`,
      streamProperties: {},
    });
    return responseFromKSQL;
  }
}
