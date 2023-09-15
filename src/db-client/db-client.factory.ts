import { Injectable } from '@nestjs/common';
import { PrismaDBClient } from './prisma-client/prisma-db-client';

@Injectable()
export class DbClientFactory {
  constructor(private prismaDBClient: PrismaDBClient) {}

  getDatabaseClient(flag: string) {
    if (flag === 'Prisma') {
      return this.prismaDBClient;
    }
  }
}
