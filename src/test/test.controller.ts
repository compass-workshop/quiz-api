import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { SubmittedTestDto } from './dto/submitted-test.dto';

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

  @Post('/:userId/:testId')
  async submitTest(@Body() testBody: SubmittedTestDto) {
    return this.testService.submitTest(testBody);
  }
}
