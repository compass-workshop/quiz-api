import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { HttpModule } from '@nestjs/axios';
import { KsqldbModule } from 'src/providers/ksqldb/ksqldb.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsStreamService } from './services/analytics-stream.service';
import { EvaluationModule } from 'src/evaluation/evaluation.module';

@Module({
  imports: [HttpModule, KsqldbModule, EvaluationModule],
  providers: [AnalyticsService, AnalyticsStreamService],
  exports: [AnalyticsStreamService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
