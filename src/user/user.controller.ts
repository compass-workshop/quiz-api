import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId/tests')
  async getTests(@Param('userId') userId: string) {
    return await this.userService.getUserTests(userId);
  }

  @Get('/:userId/tests/:testId')
  async getAttemptedTest(
    @Param('userId') userId: string,
    @Param('testId') testId: string,
  ) {
    return this.userService.getAttemptedTest(userId, testId);
  }
}
