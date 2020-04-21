import { Task } from 'src/app/model/task.model';

export class Project {
    constructor(
        public id?: number,
        public name?: string,
        public tasks?: Task[],
        public taskDescription?: string,
        public taskId?: string
    ) {
        this.tasks = [];
    }
}
