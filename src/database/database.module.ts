import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaLayer } from './prismaLayer';

@Module({
  exports: [PrismaService],
  providers: [PrismaService, PrismaLayer],
})
export class DatabaseModule {}
