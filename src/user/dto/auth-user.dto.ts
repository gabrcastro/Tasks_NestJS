import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class AuthUserDto extends CreateUserDto {
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  password: string;
}
