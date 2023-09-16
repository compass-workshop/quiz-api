import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KsqldbService } from './providers/ksqldb/ksqldb.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ksqldbService: KsqldbService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getStreamsFromKSQLDBExample')
  async getStreamsFromKSQLDBExample() {
    const responseFromKSQL = await this.ksqldbService.executeQuery({
      ksql: 'show streams;',
      streamProperties: {},
    });
    return responseFromKSQL;
  }

  @Get('getTableDataFromKSQLDBExample')
  async getTableDataFromKSQLDBExample() {
    const responseFromKSQL = await this.ksqldbService.runQuery({
      ksql: 'select * from person_stats;',
      streamProperties: {},
    });
    return responseFromKSQL;
  }
}
