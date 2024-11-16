import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of DONE 2, IN_PROGRESS 1, NOT_STARTED 0',
  })
  status?: TaskStatus;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expirationDate: Date;
}
