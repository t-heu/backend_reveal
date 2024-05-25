import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  AfterInsert
} from 'typeorm';

import { DomainEvents } from '../../../../domain/events/domainEvents';
import { UniqueEntityID } from '../../../../domain/uniqueEntityID';

import User from './User';

@Entity()
export default class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: '' })
  link: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @AfterInsert()
  dispatchAggregateEvents(): void {
    const aggregateId = new UniqueEntityID(this.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
