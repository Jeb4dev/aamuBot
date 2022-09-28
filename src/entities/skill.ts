import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  imagePath: string;

  @Column()
  emoji: string;

  @Column()
  minimumLevel: number;

  @Column()
  maximumLevel: number;

  @Column()
  experienceForLevel: number;
}
