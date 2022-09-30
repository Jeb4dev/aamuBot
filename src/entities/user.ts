import { Entity, PrimaryColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { PlayerSkill } from './player-skill';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: Date;

  @OneToMany(() => PlayerSkill, (skill) => skill.user)
  skills: PlayerSkill[];
}
