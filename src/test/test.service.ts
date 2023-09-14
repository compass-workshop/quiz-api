import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async getTests(): Promise<Test[]> {
    // const tests = await this.prismaService.test.findMany();
    const tests = [new Test()];
    return tests;
  }

  async getTest(id: string): Promise<Test> {
    // const test = await this.prismaService.test.findUnique({
    //   where: { id: id },
    // });
    const test = new Test();
    if (!test) throw new NotFoundException();
    return test;
  }
}
