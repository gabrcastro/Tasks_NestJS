import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class ResponseUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
