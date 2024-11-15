import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindByParamsDto, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private tasks: TaskDto[] = [];

  getById(id: string): TaskDto {
    return this.findTaskById(id);
  }

  getAll(): TaskDto[] {
    return this.tasks;
  }

  getAllParams(params: FindByParamsDto): TaskDto[] {
    return this.tasks.filter((task) => {
      const titleMatches = params.title ? task.title === params.title : true;
      const statusMatches = params.status ? task.status == params.status : true;

      return titleMatches && statusMatches;
    });
  }

  create(task: TaskDto): TaskDto {
    if (this.tasks.some((t) => t.id === task.id)) {
      throw new HttpException(
        `Task with ID ${task.id} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    this.tasks.push(task);
    this.logger.log(`Task with ID ${task.id} created`);
    return task;
  }

  update(task: TaskDto): TaskDto {
    const index = this.findTaskIndexById(task.id);

    this.tasks[index] = { ...this.tasks[index], ...task };
    return this.tasks[index];
  }

  delete(id: string): TaskDto[] {
    const index = this.findTaskIndexById(id);
    console.log(index);

    if (index === -1) throw new NotFoundException(`Task not found`);

    this.tasks.splice(index, 1);
    this.logger.log(`Task with ID ${id} deleted`);
    return this.tasks;
  }

  private findTaskIndexById(id: string): number {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1 || !index)
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return index;
  }

  private findTaskById(id: string): TaskDto {
    const task = this.tasks.find((t) => t.id === id);
    if (!task)
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return task;
  }

  //   private findTaskByParam(params: FindByParams): TaskDto[] {}
}
