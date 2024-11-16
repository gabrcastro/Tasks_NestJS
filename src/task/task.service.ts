import { Injectable, Logger } from '@nestjs/common';
import { GetTaskWithParamsDto } from './dto/get-task-with-params.dto';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  getById(id: number): Task {
    return this.taskRepository.findById(id);
  }

  getAll(): Task[] {
    return this.taskRepository.findAll();
  }

  getAllParams(params: GetTaskWithParamsDto): Task[] {
    return this.taskRepository.findByParams(params);
  }

  create(createTaskDto: CreateTaskDto): Task {
    return this.taskRepository.create(createTaskDto);
  }

  update(id: number, task: UpdateTaskDto): Task {
    return this.taskRepository.update(id, task);
  }

  delete(id: number): Task[] {
    return this.taskRepository.delete(id);
  }
}
