import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ name: 'updated_on' })
  updatedOn: Date;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: 0 })
  gold: number;

  @Column({ default: 0 })
  silver: number;

  @Column({ default: 0 })
  bronze: number;

  @Column({ default: 'Undefined transaction.' })
  comment: string;
}
