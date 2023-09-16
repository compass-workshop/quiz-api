import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsConsumer } from './consumer/analytics-consumer';
import { KafkaModule } from 'src/providers/kafka/kafka.module';

@Module({
  imports: [HttpModule, KafkaModule],
  providers: [AnalyticsService, AnalyticsConsumer],
})
export class AnalyticsModule {}
