import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../accounts/entities/User';

export enum priorityOptions {
  'low',
  'medium',
  'high',
}

@Entity('Tasks')
class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  priority: priorityOptions;

  @Column({ type: 'boolean', default: true })
  pending: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.task, {
    onDelete: 'CASCADE',
  })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Task };
