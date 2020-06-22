import { User } from './User'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    amount: number;

    @Column()
    barcode: string;

    @Column()
    brand: string;

    @Column()
    unity: string;

    @Column()
    categoryId: number;

    @Column()
    userId: number;

    // Class to Model
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
