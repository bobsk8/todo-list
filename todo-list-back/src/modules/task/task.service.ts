import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Task } from '../../models/task.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    save(task: any): Promise<Task> {
        try {
            const resp = this.taskRepository.save(task);
            return resp;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    findAll(): Promise<Task[]> {
        try {
            const resp = this.taskRepository.find();
            return resp;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    findOne(id: string): Promise<Task> {
        try {
            const resp = this.taskRepository.findOne(id);
            return resp;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            this.taskRepository.delete(id);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    update(id: string, task: UpdateTaskDto): Promise<Task> {
        try {            
            return this.taskRepository.save(task);
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async findByProjectId(projectId: string): Promise<Task[]> {
        try {
            const resp = this.taskRepository.find({ relations: ['task'], where: { project: { id: projectId } } });
            return resp;
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err.errmsg,
            }, HttpStatus.FORBIDDEN);
        }
    }
}
