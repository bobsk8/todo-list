import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Task } from "../task/task.model";

@Entity()
export class Project {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'varchar', nullable: false })
    name: string;
    
    @Column(type => Task)
    tasks: Task[];

    constructor() {
        this.tasks = [];
    }
}
