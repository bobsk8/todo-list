import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.model';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { Task } from './modules/task/task.model';
import { Project } from './modules/project/project.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_URL,
      port: 27017,
      username: '',
      useUnifiedTopology: true,
      password: '',
      database: 'todo-list',
      entities: [User, Task, Project],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    TaskModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
