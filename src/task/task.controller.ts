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
import { FindByParamsDto, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  private readonly _taskService: TaskService;

  constructor(taskService: TaskService) {
    this._taskService = taskService;
  }

  @Get()
  get(): TaskDto[] {
    return this._taskService.getAll();
  }

  @Get('/params')
  getByParams(@Query() params: FindByParamsDto): TaskDto[] {
    return this._taskService.getAllParams(params);
  }

  @Get('/:id')
  getById(@Param('id') id: string): TaskDto {
    return this._taskService.getById(id);
  }

  @Post()
  create(@Body() task: TaskDto): TaskDto {
    return this._taskService.create(task);
  }

  @Put()
  update(@Body() task: TaskDto): TaskDto {
    return this._taskService.update(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): TaskDto[] {
    return this._taskService.delete(id);
  }
}
