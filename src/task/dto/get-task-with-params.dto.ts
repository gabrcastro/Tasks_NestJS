import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class GetTaskWithParamsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsEnum(TaskStatus, {
    message: 'Status must be one of DONE 2, IN_PROGRESS 1, NOT_STARTED 0',
  })
  status?: TaskStatus;
}
