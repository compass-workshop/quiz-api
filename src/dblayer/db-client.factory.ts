import { Injectable } from '@nestjs/common';
import { PrismaDBLayer } from './prisma-layer/prisma-dblayer';

@Injectable()
export class DbClientFactory {
  constructor(private prismaDbLayer: PrismaDBLayer) {}

  getDatabaseClient(flag: string) {
    if (flag === 'Prisma') {
      return this.prismaDbLayer;
    }
  }
}
