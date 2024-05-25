import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  AfterInsert,
} from 'typeorm';

import { DomainEvents } from '../../../../domain/events/domainEvents';
import { UniqueEntityID } from '../../../../domain/uniqueEntityID';
import Post from './Post';
import User from './User';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  post_id: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

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
