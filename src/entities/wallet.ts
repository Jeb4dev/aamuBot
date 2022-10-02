import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Profile } from './profile';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ name: 'updated_on' })
  updatedOn: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Relation<Profile>;

  @Column({ default: 0 })
  gold: number;

  @Column({ default: 0 })
  silver: number;

  @Column({ default: 0 })
  bronze: number;
}
