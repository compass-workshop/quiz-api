import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';
import { DbClientFactory } from 'src/dblayer/db-client.factory';

@Module({
  imports: [DatabaseModule],
  providers: [TestService, DbClientFactory],
  controllers: [TestController],
})
export class TestModule {}
