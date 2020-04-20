import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class ProjectService {
    constructor(
        private taskService: TaskService,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    save(project: any, user: User): Promise<Project> {
        try {
            project.user = user;
            return this.projectRepository.save(project);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }

    }

    async findAll(userId: string): Promise<Project[]> {
        try {
            const projects = await this.projectRepository.find({ relations: ['user', 'task'], where: { user: { id: userId } } });            
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
            const project = await this.projectRepository.findOne({ relations: ['task'], where: { id } });            
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
            return this.projectRepository.save(user);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async saveTask(id: string, createTask: CreateTaskDto) {
        try {
            const project = await this.projectRepository.findOne(id);
            const task = new Task();
            task.description = createTask.description;
            task.project = project;
            // const task = new Task(createTask.description, projectId);            
            return this.taskService.save(task);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }

    }
}
