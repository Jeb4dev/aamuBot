import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from 'typeorm';
import { Skill } from './skill';
import { Profile } from './profile';

@Entity({ name: 'player_skills' })
export class PlayerSkill {
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

  @ManyToOne(() => Skill)
  skill: Skill;

  @ManyToOne(() => Profile)
  profile: Profile;

  // Should be equal to skill.minimumLevel by default
  @Column({
    default: 1,
  })
  level: number;

  @Column({
    default: 0,
  })
  experience: number;
}
