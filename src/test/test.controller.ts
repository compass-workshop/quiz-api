import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('')
  async getTests() {
    return await this.testService.getTests();
  }

  @Get('/:id')
  async getTest(@Param('id') id: string) {
    return this.testService.getTest(id);
  }
}
