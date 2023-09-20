import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { KsqldbModule } from './providers/ksqldb/ksqldb.module';
import configuration from './config/configuration';
import { AnalyticsModule } from './analytics/analytics.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TestModule,
    AnalyticsModule,
    EvaluationModule,
    KsqldbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
