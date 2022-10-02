import {
  Entity,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { PlayerSkill } from './player-skill';
import { User } from './user';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: Date;

  @OneToMany(() => PlayerSkill, (skill) => skill.profile)
  skills: PlayerSkill[];

  @Column()
  label: string;
}
