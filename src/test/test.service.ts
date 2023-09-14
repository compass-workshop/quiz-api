import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async getTests(): Promise<Test[]> {
    try {
      const tests = await this.prismaService.test.findMany({
        include: {
          questions: true,
        },
      });
      return tests;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTest(id: string): Promise<Test> {
    try {
      const test = await this.prismaService.test.findUnique({
        where: { id },
        include: {
          questions: true,
        },
      });
      if (!test) throw new NotFoundException('Test not found');
      return test;
    } catch (error) {
      throw new NotFoundException('Test not found');
    }
  }
}
