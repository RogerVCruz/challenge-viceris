import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @Column({ type: 'boolean', default: false })
  pending: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Task };
