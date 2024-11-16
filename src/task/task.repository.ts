import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskWithParamsDto } from './dto/get-task-with-params.dto';

@Injectable()
export class TaskRepository {
  private tasks: Task[] = [];
  private currentId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  findByParams(params: GetTaskWithParamsDto): Task[] {
    return this.tasks.filter((task) => {
      const titleMatches = params.title ? task.title === params.title : true;
      const statusMatches = params.status ? task.status == params.status : true;

      return titleMatches && statusMatches;
    });
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask = new Task(
      this.currentId++, // Gera o ID automaticamente
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.status || 2, // Padrão para NOT_STARTED
      createTaskDto.expirationDate,
    );

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const index = this.findTaskIndexById(id);

    const updatedTask = {
      ...this.tasks[index],
      ...updateTaskDto,
      expirationDate: new Date(updateTaskDto.expirationDate),
    };
    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  delete(id: number): Task[] {
    const index = this.findTaskIndexById(id);
    this.tasks.splice(index, 1);
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
