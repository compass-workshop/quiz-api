import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
