import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@/shared/infra/database/typeorm/entity/User';
import Comment from '@/shared/infra/database/typeorm/entity/Comment';
import Like from '@/shared/infra/database/typeorm/entity/Like';
import HidePost from '@/shared/infra/database/typeorm/entity/HidePost';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn() // ({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn() // ({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, comments => comments.post)
  comments: Comment[];

  @OneToMany(() => Like, likes => likes.post)
  likes: Like[];

  @OneToMany(() => HidePost, hide_posts => hide_posts.post)
  hide_posts: HidePost[];
}
