import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
    category_id: number;

    @Column()
    user_id: number;
}
