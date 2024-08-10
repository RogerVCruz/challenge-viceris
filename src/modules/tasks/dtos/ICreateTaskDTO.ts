import { priorityOptions } from '../entities/Task';

interface ICreateTaskDTO {
  description: string;
  priority: priorityOptions;
  user_id: string;
}

export { ICreateTaskDTO };
