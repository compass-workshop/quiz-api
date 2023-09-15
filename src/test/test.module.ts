import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DBClientModule } from 'src/db-client/bd-client.module';

@Module({
  imports: [DatabaseModule, DBClientModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
