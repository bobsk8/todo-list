import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ unique: true, type: 'varchar', nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;
}
