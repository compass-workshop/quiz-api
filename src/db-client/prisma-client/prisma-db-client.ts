import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BaseDBClient } from 'src/db-client/base-db-client';

@Injectable()
export class PrismaDBClient extends BaseDBClient {
  constructor(private baseDBClient: BaseDBClient) {
    super(new PrismaService());
  }

  findTest(id: string) {
    return this.baseDBClient.findUnique('test', {
      where: { id },
      include: { questions: true },
    });
  }
  findAllTest() {
    return this.baseDBClient.findMany('test', {
      include: { questions: true },
    });
  }
}
