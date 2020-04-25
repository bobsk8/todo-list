import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;
}
