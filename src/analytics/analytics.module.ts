import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { HttpModule } from '@nestjs/axios';
import { KsqldbModule } from 'src/providers/ksqldb/ksqldb.module';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [HttpModule, KsqldbModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
