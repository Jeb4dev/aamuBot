import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {defaults} from "pg";

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({default: null, nullable: true})
  customText: string;

  @Column()
  date: Date;

  @Column()
  channel: string;
}
