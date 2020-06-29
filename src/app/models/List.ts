import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;


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
