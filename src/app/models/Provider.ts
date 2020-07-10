import { User } from './User'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  address: string;

  @Column({ name: 'url_image'})
  urlImage: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updateAt: Date;
}
