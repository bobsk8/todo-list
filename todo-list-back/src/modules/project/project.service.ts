import { Injectable, HttpException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Project } from './project.model';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class ProjectService {
    constructor(
        private taskService: TaskService,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    save(project: any): Promise<Project> {
        return this.projectRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    findOne(id: string): Promise<Project> {
        return this.projectRepository.findOne(id);
    }

    findByName(name: string): Promise<Project> {
        return this.projectRepository.findOne({ where: { name } });
    }

    async remove(id: string): Promise<void> {
        await this.projectRepository.delete(id);
    }

    update(id: string, user: any): Promise<Project> {
        return this.projectRepository.save(user);
    }

    async saveTask(projectId: string, task: CreateTaskDto): Promise<Project> {
        const taskSave = { project: projectId, ...task };
        const taskSaved = await this.taskService.save(taskSave);
        const project = await this.projectRepository.findOne(projectId);

        try {
            project.tasks.push(taskSaved);
            const repo = getManager().getRepository(Project);
            repo.update(projectId, project);
        } catch (e) {
            const id = taskSaved.id.toString();
            await this.taskService.remove(id);
            throw new NotFoundException(e);
        }
        return project;
    }
}
