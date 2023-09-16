import { Module } from '@nestjs/common';
import { SubmittedTestConsumer } from './consumer/submitted-test.consumer';
import { KafkaModule } from 'src/providers/kafka/kafka.module';
import { EvaluateScoreService } from './evaluate-score.service';
import { DBClientModule } from 'src/db-client/db-client.module';
import { EvaluationProducerService } from './producer/evaluation-producer.service';

@Module({
  imports: [KafkaModule, DBClientModule],
  providers: [
    SubmittedTestConsumer,
    EvaluateScoreService,
    EvaluationProducerService,
  ],
})
export class EvaluationModule {}
