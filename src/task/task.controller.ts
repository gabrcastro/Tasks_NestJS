import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { GetTaskWithParamsDto } from './dto/get-task-with-params.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async get(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/params')
  async getByParams(@Query() params: GetTaskWithParamsDto): Promise<Task[]> {
    return this.taskService.getAllParams(params);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.delete(id);
  }
}
