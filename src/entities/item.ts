import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

type ItemType = 'armor' | 'weapon' | 'usable' | 'misc';

@Entity({ name: 'items' })
export class Item {
  @PrimaryColumn()
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

  @Column()
  description: string;

  @Column()
  type: ItemType;

  @Column({ name: 'basePrice' })
  basePrice: number;

  @Column()
  emoji: string;

  @Column({ name: 'image_path' })
  imagePath: string;

  @Column({ name: 'stack_size' })
  stackSize: number; // amount of items in one inventory slot

  @Column({
    name: 'attack_physical',
  })
  attackPhysical: number;

  @Column({
    name: 'attack_magical',
  })
  attackMagical: number;

  @Column({
    name: 'defense_physical',
  })
  defensePhysical: number;

  @Column({
    name: 'defense_magical',
  })
  defenseMagical: number;

  @Column({
    name: 'support',
  })
  support: number;
}
