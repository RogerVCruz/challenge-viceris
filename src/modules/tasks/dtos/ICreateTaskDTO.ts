import { priorityOptions } from '../entities/Task';

interface ICreateTaskDTO {
  description: string;
  priority: priorityOptions;
}

export { ICreateTaskDTO };
