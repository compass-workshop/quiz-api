import { Module } from '@nestjs/common';
import { SubmittedTestConsumer } from './consumer/submitted-test.consumer';
import { KafkaModule } from 'src/providers/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [SubmittedTestConsumer],
})
export class EvaluationModule {}
