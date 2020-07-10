import { Provider } from './Provider';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    password: string;

    @Column()
    provider: boolean;

    @Column()
    user_id: number;

    @Column()
    provider_id: number;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
