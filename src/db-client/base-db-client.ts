import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseDBClient {
  modelService: any;

  constructor(modelService: any) {
    this.modelService = modelService;
  }

  async findMany<T>(
    model: string,
    options: { where?: any; include?: any },
  ): Promise<T[]> {
    try {
      return await this.modelService[model].findMany({
        where: options.where,
        include: options.include,
      });
    } catch (error) {
      console.error(`Error in findMany for model ${model}: ${error.message}`);
      throw new Error(`Error in findMany for model ${model}`);
    }
  }

  async findUnique<T>(
    model: string,
    options: { where?: any; include?: any },
  ): Promise<T[]> {
    try {
      return await this.modelService[model].findUnique({
        where: options.where,
        include: options.include,
      });
    } catch (error) {
      console.error(`Error in findUnique for model ${model}: ${error.message}`);
      throw new Error(`Error in findUnique for model ${model}`);
    }
  }
}
