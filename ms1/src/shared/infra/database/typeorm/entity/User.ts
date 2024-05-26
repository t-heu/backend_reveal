import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterInsert,
} from 'typeorm';

import { DomainEvents } from '../../../../domain/events/domainEvents';
import { UniqueEntityID } from '../../../../domain/uniqueEntityID';

import Post from './Post';
import Comment from './Comment';
import HidePost from './HidePost';
import Like from './Like';
import Token from './Token';
import ExternalAuth from './ExternalAuth';
import Notification from './Notification';
import PushNotificationToken from './PushNotificationToken';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  enabled: boolean;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  locale: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, posts => posts.user)
  posts: Post[];

  @OneToMany(() => Notification, notifications => notifications.user)
  notification: Notification[];

  @OneToMany(() => Comment, comments => comments.user)
  comments: Comment[];

  @OneToMany(() => Like, likes => likes.user)
  likes: Like[];

  @OneToMany(() => HidePost, block => block.user)
  hide_posts: HidePost[];

  @OneToMany(() => Token, token => token.user)
  tokens: Token[];

  @OneToMany(() => ExternalAuth, profile => profile.user)
  external_auths: ExternalAuth[];

  @OneToMany(() => PushNotificationToken, key => key.user)
  notification_keys: PushNotificationToken[];

  @AfterInsert()
  dispatchAggregateEvents(): void {
    const aggregateId = new UniqueEntityID(this.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
