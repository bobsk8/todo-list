import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.model';

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

    findByName(name: string): Promise<Task> {
        return this.taskRepository.findOne({ where: { name } });
    }

    async remove(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }

    update(id: string, user: any): Promise<Task> {
        return this.taskRepository.save(user);
    }
}
