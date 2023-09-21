import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TestService } from './test.service';
import { SubmittedTestDto } from './dto/submitted-test.dto';

@ApiTags('tests')
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tests' })
  async getTests() {
    return await this.testService.getTests();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get test by test id' })
  async getTest(@Param('id') id: string) {
    return this.testService.getTest(id);
  }

  @Post('/:userId/:testId')
  @ApiBody({ type: [SubmittedTestDto] })
  @ApiOperation({ summary: 'Submit user test' })
  async submitTest(
    @Body() testBody: SubmittedTestDto,
    @Param('userId') userId: string,
    @Param('testId') testId: string,
  ) {
    return this.testService.submitTest(testBody, userId, testId);
  }

  @Get('/:userId/:testId')
  async reviewTest(
    @Param('userId') userId: string,
    @Param('testId') testId: string,
  ) {
    return this.testService.reviewTest(userId, testId);
  }
}
