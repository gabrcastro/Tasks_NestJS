import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { GetTaskWithParamsDto } from './dto/get-task-with-params.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  private readonly _taskService: TaskService;

  constructor(taskService: TaskService) {
    this._taskService = taskService;
  }

  @Get()
  async get(): Promise<Task[]> {
    return this._taskService.getAll();
  }

  @Get('/params')
  async getByParams(@Query() params: GetTaskWithParamsDto): Promise<Task[]> {
    return this._taskService.getAllParams(params);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Task> {
    return this._taskService.getById(id);
  }

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<Task> {
    return this._taskService.create(task);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this._taskService.update(id, task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Task[]> {
    return this._taskService.delete(id);
  }
}
