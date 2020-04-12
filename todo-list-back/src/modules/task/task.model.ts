import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Task {

    @ObjectIdColumn({ unique: true })
    id: ObjectID;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'boolean' })
    completed: boolean;

    @Column({ type: 'varchar' })
    project: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    constructor(description: string, project) {
        this.project = project;
        this.description = description;
        this.completed = false;
    }
}
