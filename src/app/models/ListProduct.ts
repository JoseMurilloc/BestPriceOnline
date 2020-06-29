import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from '../models/Product';

@Entity('listProducts')
export class ListProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  list_id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
