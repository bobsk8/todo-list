import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Task } from "./task.model";
import { User } from "../modules/user/user.model";

@Entity()
export class Project {

    @ObjectIdColumn({ unique: true })
    id: ObjectID;

    @Column({ nullable: false })
    name: string;
    
    @Column()
    tasks: Task[];

    @Column()
    user: User;

    constructor() {
        this.tasks = [];
    }
}
