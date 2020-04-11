import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
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

    @BeforeInsert()
    private beforeInsert() {
        console.log('executing before insert');
    }


    constructor(description: string) {
        this.description = description;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.completed = false;
    }
}
