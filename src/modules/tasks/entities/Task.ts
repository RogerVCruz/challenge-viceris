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

export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done',
  EMPTY = '',
}

export const taskStatusIsValid = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.EMPTY:
    case TaskStatus.DONE:
    case TaskStatus.PENDING:
      return true;

    default:
      return false;
  }
};

@Entity('Tasks')
class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  priority: priorityOptions;

  @Column({ type: 'varchar', default: true })
  status: TaskStatus;

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

    if (!this.status) {
      this.status = TaskStatus.PENDING;
    }
  }
}

export { Task };
