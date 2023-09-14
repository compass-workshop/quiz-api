import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLayer } from './prismaLayer';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private prismaLayer: PrismaLayer) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }

  // async findMany(model: any, options: any) {
  //   this.prismaLayer.findMany(model, options);
  // }

  // async findUnique(model: any, options: any) {
  //   this.prismaLayer.findUnique(model, options);
  // }
}
