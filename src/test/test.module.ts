import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';
import { KafkaModule } from '../providers/kafka/kafka.module';

@Module({
  imports: [DatabaseModule, KafkaModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
