import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Relation, JoinColumn } from 'typeorm';
import { SelectedProfile } from './selected-profile';

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

  @OneToOne(() => SelectedProfile, (selected) => selected.user)
  selectedProfile: Relation<SelectedProfile>;
}
