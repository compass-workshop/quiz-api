import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DbClientFactory {
  constructor(private prismaService: PrismaService) {}

  getDatabaseClient(flag: string) {
    if (flag === 'Prisma') {
      return this.prismaService;
    }
  }
}
