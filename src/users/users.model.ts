import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityWithDates } from '../entity-with-dates';

@Entity('users')
export class User implements EntityWithDates {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 127, nullable: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
