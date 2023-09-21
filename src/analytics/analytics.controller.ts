import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/:userId')
  @ApiOperation({ summary: 'Get analytics of a user' })
  async getAnalytics(@Param('userId') userId: string) {
    return this.analyticsService.getAnalytics(userId);
  }
}
