import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from '../../models/project.model';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
