import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Profile } from './profile';
import { User } from './user';

@Entity({ name: 'selected_profile' })
export class SelectedProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.selectedProfile)
  @JoinColumn()
  user: User;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Relation<Profile>;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: Date;
}
