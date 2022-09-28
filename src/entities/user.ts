import { Entity, PrimaryColumn, CreateDateColumn, OneToMany, JoinTable, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerSkill } from './playerSkill';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PlayerSkill, (skill) => skill.user)
  skills: PlayerSkill[];
}
