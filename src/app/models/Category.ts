import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
