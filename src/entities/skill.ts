import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'skills' })
export class Skill {
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
  name: string;

  @Column({
    default: 'static/img/skills/skills_placeholder.png',
    name: 'image_path',
  })
  imagePath: string;

  @Column()
  emoji: string;

  @Column({
    default: 1,
    name: 'minimum_level',
  })
  minimumLevel: number;

  @Column({
    default: 999,
    name: 'maximum_level',
  })
  maximumLevel: number;

  @Column({
    default: 10,
    name: 'base_experience',
  })
  baseExperience: number;

  @Column({
    default: 2,
    name: 'growth_rate',
  })
  growthRate: number;
}
