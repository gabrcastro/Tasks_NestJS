import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetTaskWithParamsDto } from './dto/get-task-with-params.dto';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private tasks: Task[] = [];
  private currentId = 0;

  getById(id: number): Task {
    return this.findTaskById(id);
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getAllParams(params: GetTaskWithParamsDto): Task[] {
    return this.tasks.filter((task) => {
      const titleMatches = params.title ? task.title === params.title : true;
      const statusMatches = params.status ? task.status == params.status : true;

      return titleMatches && statusMatches;
    });
  }

  create(createTaskDto: CreateTaskDto): Task {
    // if (this.tasks.some((t) => t.id === createTaskDto.id)) {
    //   throw new ConflictException(`Task with ID ${task.id} already exists`);
    // }

    this.currentId++;
    const newTask: Task = {
      ...createTaskDto,
      id: this.currentId,
      status: createTaskDto.status,
    };

    this.tasks.push(newTask);
    this.logger.log(`Task was created`);

    return newTask;
  }

  update(id: number, task: UpdateTaskDto): Task {
    const index = this.findTaskIndexById(id);

    const updatedTask = {
      ...this.tasks[index],
      ...task,
      expirationDate: new Date(task.expirationDate),
    };
    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  delete(id: number): Task[] {
    const index = this.findTaskIndexById(id);
    this.tasks.splice(index, 1);
    this.logger.log(`Task with ID ${id} deleted`);
    return this.tasks;
  }

  private findTaskIndexById(id: number): number {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1 || !index)
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return index;
  }

  private findTaskById(id: number): Task {
    const task = this.tasks.find((t) => t.id == id);
    if (!task)
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return task;
  }
}
