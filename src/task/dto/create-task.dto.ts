import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status must be one of DONE 2, IN_PROGRESS 1, NOT_STARTED 0',
  })
  status?: TaskStatus;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  expirationDate: Date;
}
