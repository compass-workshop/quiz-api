import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class TestController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/:userId')
  async getTest(@Param('userId') userId: string) {
    return this.analyticsService.getAnalytics(userId);
  }
}
