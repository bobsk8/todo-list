import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Task {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'varchar' })
    project: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @CreateDateColumn({ type: 'timestamp', nullable: true  })
    updatedAt: Date;
}
