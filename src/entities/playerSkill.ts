import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from 'typeorm';
import { Skill } from './skill';
import { User } from './user';

@Entity({ name: 'player_skills' })
export class PlayerSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Skill)
  skill: Skill;

  @ManyToOne(() => User)
  user: User;

  @Column()
  level: number = 0;

  @Column()
  experience: number = 0;
}
