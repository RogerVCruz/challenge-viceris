import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../tasks/entities/Task';

@Entity('Users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, task => task.user)
  task: Task[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
