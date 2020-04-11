import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Project } from './project.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { Task } from '../task/task.model';

@Injectable()
export class ProjectService {
    constructor(
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

    async saveTask(projectId: string, createTask: CreateTaskDto) {
        const task = new Task(createTask.description);
        const project = await this.projectRepository.update(projectId, { tasks: [task] });
        return project;
    }

    async updateTask(projectId: string, projectUpdate: Project): Promise<any> {
        const repo = getManager().getRepository(Project);
        const projectSaved = repo.update(projectId, projectUpdate);
        return projectSaved;
    }
}
