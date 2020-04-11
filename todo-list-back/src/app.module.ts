import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_URL,
      port: 27017,
      username: '',
      useUnifiedTopology: true,
      password: '',
      database: 'todo-list',
      entities: [User],
      synchronize: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
