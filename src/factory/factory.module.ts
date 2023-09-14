import { Module } from '@nestjs/common';
import { DbClientFactory } from './dbClient.factory';

@Module({
  exports: [DbClientFactory],
  providers: [DbClientFactory],
})
export class FactoryModule {}
