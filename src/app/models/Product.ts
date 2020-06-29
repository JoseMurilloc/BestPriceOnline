import { User } from './User'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    barcode: string;

    @Column()
    brand: string;

    @Column()
    unity: string;

    @Column()
    category_id: number;

    @Column()
    user_id: number;

    // Class to Model
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
