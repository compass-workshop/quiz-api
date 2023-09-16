import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { KsqldbModule } from './providers/ksqldb/ksqldb.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TestModule,
    KsqldbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
