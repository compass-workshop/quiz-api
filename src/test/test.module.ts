import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';
import { DbClientFactory } from 'src/dblayer/db-client.factory';
import { PrismaDBLayer } from 'src/dblayer/prisma-layer/prisma-dblayer';
import { baseDBLayer } from 'src/dblayer/base-dblayer';

@Module({
  imports: [DatabaseModule],
  providers: [TestService, DbClientFactory, PrismaDBLayer, baseDBLayer],
  controllers: [TestController],
})
export class TestModule {}
