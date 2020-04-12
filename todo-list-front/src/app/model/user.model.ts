import { Task } from './task.model';

export class User {
    constructor(
        public id?: string,
        public name?: string,
        public tasks?: Task[]
    ) {}
}
