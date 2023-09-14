import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { baseDBLayer } from 'src/dblayer/base-dblayer'

@Injectable()
export class PrismaDBLayer extends baseDBLayer {
  constructor(private prismaService: PrismaService) {}

  private find(what) {
    this.prismaService.test.find
  }

  findTest(testId) {
    find('test')
  }
  findAllTest() {

  }
  deleteTest(testId) {

  }

  findUser() {
    this.prismaService.user.find
  }
}
