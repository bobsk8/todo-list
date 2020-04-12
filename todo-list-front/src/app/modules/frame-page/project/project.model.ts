import { Task } from 'src/app/model/task.model';

export class Project {
    constructor(
        public id?: string,
        public name?: string,
        public tasks?: Task[]
    ) {
        this.tasks = [];
    }
}
