import { Module } from '@nestjs/common';
import { DbClientFactory } from './db-client.factory';
import { BaseDBClient } from './base-db-client';
import { PrismaDBClient } from './prisma-client/prisma-db-client';

@Module({
  exports: [DbClientFactory],
  providers: [DbClientFactory, BaseDBClient, PrismaDBClient],
})
export class DBClientModule {}
