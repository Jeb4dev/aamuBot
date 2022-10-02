import {
  Entity,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Relation,
} from 'typeorm';
import { PlayerSkill } from './player-skill';
import { User } from './user';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: Relation<User>;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: Date;

  @OneToMany(() => PlayerSkill, (skill) => skill.profile)
  skills: Relation<PlayerSkill[]>;

  @Column()
  label: string;
}
