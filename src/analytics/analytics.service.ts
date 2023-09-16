import { Injectable, NotFoundException } from '@nestjs/common';
import { Analytics } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  dbClient: any;
  constructor() {}

  async getAnalytics(id: string): Promise<Analytics> {
    return 'hello';
  }
}
