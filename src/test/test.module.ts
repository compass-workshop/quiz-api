import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { KafkaModule } from '../providers/kafka/kafka.module';
import { TestProducerService } from './services/test-producer.service';
import { DatabaseModule } from 'src/database/database.module';
import { DBClientModule } from 'src/db-client/db-client.module';

@Module({
  imports: [DatabaseModule, KafkaModule, DBClientModule],
  providers: [TestService, TestProducerService],
  controllers: [TestController],
})
export class TestModule {}
