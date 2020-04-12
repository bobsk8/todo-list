import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Task } from "../task/task.model";
import { User } from "../user/user.model";

@Entity()
export class Project {

    @ObjectIdColumn({ unique: true })
    id: ObjectID;

    @Column({ type: 'varchar', nullable: false })
    name: string;
    
    @Column(type => Task)
    tasks: Task[];

    @Column(type => User)
    user: User;

    constructor() {
        this.tasks = [];
    }
}
