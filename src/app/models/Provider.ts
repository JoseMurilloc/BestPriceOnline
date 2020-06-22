import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('providers')
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    amount_offer: number;

    @Column()
    user_id: number;
}
