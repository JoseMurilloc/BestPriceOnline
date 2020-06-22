import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
