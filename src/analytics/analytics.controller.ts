import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './dto/analytics.dto';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/:userId')
  @ApiOperation({ summary: 'Get analytics of a user' })
  @ApiOkResponse({
    description: 'Analytics fetched successfully',
    type: Analytics,
  })
  async getAnalytics(@Param('userId') userId: string) {
    return this.analyticsService.getAnalytics(userId);
  }
}
