import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Project } from './project.model';
import { Task } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';

@Injectable()
export class ProjectService {
    constructor(
        private taskService: TaskService,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    save(project: any, userId: string): Promise<Project> {
        project.user = userId;
        return this.projectRepository.save(project);
    }

    async findAll(user: string): Promise<Project[]> {
        const projects = await this.projectRepository.find({ where: { user } });
        await Promise.all(
            projects.map(async (project) => {
                const tasks = await this.taskService.findByProjectId(project.id.toString());
                project.tasks = tasks;
            })
        );
        return projects;
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne(id);
        const tasks = await this.taskService.findByProjectId(id);
        project.tasks = tasks;
        return project;
    }

    async remove(id: string): Promise<void> {
        await this.projectRepository.delete(id);
    }

    update(id: string, user: any): Promise<Project> {
        const repo = getManager().getRepository(Project);
        repo.update(id, user);
        return this.projectRepository.findOne(id);
    }

    async saveTask(projectId: string, createTask: CreateTaskDto) {
        const task = new Task(createTask.description, projectId);
        return this.taskService.save(task);        
    }
}
