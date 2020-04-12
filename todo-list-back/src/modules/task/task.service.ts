import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    save(task: any): Promise<Task> {        
        return this.taskRepository.save(task);
    } 

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    findOne(id: string): Promise<Task> {
        return this.taskRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }

    update(id: string, task: UpdateTaskDto): Promise<Task> {
        const repo = getManager().getRepository(Task);
        repo.update(id, task);
        return this.taskRepository.findOne(id);
    }

    async findByProjectId(project: string): Promise<Task[]> {
        return this.taskRepository.find({ project });
    }
}
