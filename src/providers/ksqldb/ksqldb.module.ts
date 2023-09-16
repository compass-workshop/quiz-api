import { Module } from '@nestjs/common';
import { KsqldbService } from './ksqldb.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [KsqldbService],
  exports: [KsqldbService],
})
export class KsqldbModule {}
