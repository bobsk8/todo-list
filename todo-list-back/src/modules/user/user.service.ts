import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { passwordHash } from '../auth/helpers'
import { User } from './user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    save(user: any): Promise<User> {
        user.password = passwordHash(user.password);
        return this.usersRepository.save(user);
    } 

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findByUserName(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    update(id: string, user: any): Promise<User> {
        return this.usersRepository.save(user);
    }
}
