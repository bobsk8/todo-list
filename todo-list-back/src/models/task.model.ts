import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Task {

    @ObjectIdColumn({ unique: true })
    id: ObjectID;

    @Column()
    description: string;

    @Column({ type: 'boolean' })
    completed: boolean;

    @Column()
    project: string;

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date;

    constructor(description: string, project) {
        this.project = project;
        this.description = description;
        this.completed = false;
    }
}
