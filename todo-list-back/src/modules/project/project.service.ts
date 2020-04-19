import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
        try {
            project.user = userId;
            return this.projectRepository.save(project);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }

    }

    async findAll(user: string): Promise<Project[]> {
        try {
            const projects = await this.projectRepository.find({ where: { user } });
            await Promise.all(
                projects.map(async (project) => {
                    const tasks = await this.taskService.findByProjectId(project.id.toString());
                    project.tasks = tasks;
                })
            );
            return projects;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async findOne(id: string): Promise<Project> {
        try {
            const project = await this.projectRepository.findOne(id);
            const tasks = await this.taskService.findByProjectId(id);
            project.tasks = tasks;
            return project;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            this.projectRepository.delete(id);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    update(id: string, user: any): Promise<Project> {
        try {
            const repo = getManager().getRepository(Project);
            repo.update(id, user);
            return this.projectRepository.findOne(id);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async saveTask(projectId: string, createTask: CreateTaskDto) {
        try {
            const task = new Task(createTask.description, projectId);
            return this.taskService.save(task);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }

    }
}
