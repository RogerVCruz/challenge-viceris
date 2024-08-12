import { priorityOptions, TaskStatus } from '../entities/Task';

interface ICreateTaskDTO {
  description: string;
  priority: priorityOptions;
  status: TaskStatus;
  user_id: string;
}

export { ICreateTaskDTO };
