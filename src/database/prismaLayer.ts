export class PrismaLayer {
  async findMany<T>(
    model: string,
    options: { where?: any; include?: any },
  ): Promise<T[]> {
    try {
      return await this[model].findMany({
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
      return await this[model].findUnique({
        where: options.where,
        include: options.include,
      });
    } catch (error) {
      console.error(`Error in findUnique for model ${model}: ${error.message}`);
      throw new Error(`Error in findUnique for model ${model}`);
    }
  }
}
