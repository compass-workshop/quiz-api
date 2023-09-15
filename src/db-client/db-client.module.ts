import { Module } from '@nestjs/common';
import { DBClientFactory } from './db-client.factory';
import { BaseDBClient } from './base-db-client';
import { PrismaDBClient } from './prisma-client/prisma-db-client';

@Module({
  exports: [DBClientFactory],
  providers: [DBClientFactory, BaseDBClient, PrismaDBClient],
})
export class DBClientModule {}
