import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
