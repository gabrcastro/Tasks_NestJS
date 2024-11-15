import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TaskStatus {
  DONE = 2,
  IN_PROGRESS = 1,
  NOT_STARTED = 0,
}

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  status?: number;

  @IsString()
  expirationDate: Date;
}

export class FindByParamsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  status?: number;
}
