import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { baseDBLayer } from 'src/dblayer/base-dblayer';

@Injectable()
export class PrismaDBLayer extends baseDBLayer {
  constructor(private baseDBLayer: baseDBLayer) {
    super(new PrismaService());
  }

  findTest(id: string) {
    return this.baseDBLayer.findUnique('test', {
      where: { id },
      include: { questions: true },
    });
  }
  findAllTest() {
    return this.baseDBLayer.findMany('test', {
      include: { questions: true },
    });
  }
}
