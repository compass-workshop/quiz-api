import { Injectable } from '@nestjs/common';
import { PrismaDBClient } from './prisma-client/prisma-db-client';
import { constants } from 'src/contants';

@Injectable()
export class DBClientFactory {
  constructor(private prismaDBClient: PrismaDBClient) {}

  getDatabaseClient(flag: string) {
    if (flag === constants.PRISMA) {
      return this.prismaDBClient;
    }
  }
}
