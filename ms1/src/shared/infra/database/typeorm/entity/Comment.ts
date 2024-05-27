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

import { DomainEvents } from '@/shared/domain/events/domainEvents';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import Post from '@/shared/infra/database/typeorm/entity/Post';
import User from '@/shared/infra/database/typeorm/entity/User';

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
