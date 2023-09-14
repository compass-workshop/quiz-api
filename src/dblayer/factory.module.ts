import { Module } from '@nestjs/common';
import { DbClientFactory } from './db-client.factory';

@Module({
  exports: [DbClientFactory],
  providers: [DbClientFactory],
})
export class FactoryModule {}
