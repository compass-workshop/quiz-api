import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TestService],
})
export class TestModule {}
