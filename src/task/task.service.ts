import {
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
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/database/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    if (!tasks) throw new NotFoundException('Tasks not found');

    return tasks;
  }

  async getAllParams(params: GetTaskWithParamsDto): Promise<Task[]> {
    const where: Partial<GetTaskWithParamsDto> = {};
    if (params.title) where.title = params.title;
    if (params.status) where.status = params.status;

    const task = await this.taskRepository.find({ where });

    if (!task || !task.length) throw new NotFoundException();

    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = {
      id: uuid(),
      ...createTaskDto,
    };
    const taskCreated = await this.taskRepository.save(newTask);
    return taskCreated;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const taskUpdated = await this.taskRepository.update(id, updateTaskDto);
      if (!taskUpdated) throw new NotFoundException('Task not found');
      const task = {
        ...taskUpdated,
      };
      return taskUpdated.raw;
    } catch (err) {
      this.logger.error(`Failed to update task with id: ${id}`);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<Task[]> {
    try {
      const taskRemoved = await this.taskRepository.delete(id);
      if (!taskRemoved) throw new NotFoundException('Task not found');
      return await this.taskRepository.find();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
