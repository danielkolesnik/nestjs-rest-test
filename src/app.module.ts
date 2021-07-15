import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local dependencies
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import ConfigModule from './configs/config.module';
import typeOrmConfigLoader from './configs/typeorm-config-loader';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(typeOrmConfigLoader),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
