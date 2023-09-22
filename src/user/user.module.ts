import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { KsqldbModule } from 'src/providers/ksqldb/ksqldb.module';
import { DBClientModule } from 'src/db-client/db-client.module';

@Module({
  imports: [KsqldbModule, DBClientModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
