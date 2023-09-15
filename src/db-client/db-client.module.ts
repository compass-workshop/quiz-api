import { Module } from '@nestjs/common';
import { DBClientFactory } from './db-client.factory';
import { BaseDBClient } from './base-db-client';
import { PrismaDBClient } from './prisma-client/prisma-db-client';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  exports: [DBClientFactory],
  providers: [DBClientFactory, BaseDBClient, PrismaDBClient, PrismaService],
})
export class DBClientModule {}
