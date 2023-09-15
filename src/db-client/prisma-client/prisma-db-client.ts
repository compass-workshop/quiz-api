import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BaseDBClient } from 'src/db-client/base-db-client';
import { constants } from 'src/contants';

@Injectable()
export class PrismaDBClient extends BaseDBClient {
  constructor(private prismaService: PrismaService) {
    super();
  }

  findTest(id: string) {
    return this.findUnique(constants.TEST, {
      where: { id },
      include: { questions: true },
    });
  }
  findAllTest() {
    return this.findMany(constants.TEST, {
      include: { questions: true },
    });
  }

  private async findMany<T>(
    model: string,
    options: { where?: any; include?: any },
  ): Promise<T[]> {
    try {
      return await this.prismaService[model].findMany({
        where: options.where,
        include: options.include,
      });
    } catch (error) {
      console.error(`Error in findMany for model ${model}: ${error.message}`);
      throw new Error(`Error in findMany for model ${model}`);
    }
  }

  private async findUnique<T>(
    model: string,
    options: { where?: any; include?: any },
  ): Promise<T[]> {
    try {
      return await this.prismaService[model].findUnique({
        where: options.where,
        include: options.include,
      });
    } catch (error) {
      console.error(`Error in findUnique for model ${model}: ${error.message}`);
      throw new Error(`Error in findUnique for model ${model}`);
    }
  }
}
