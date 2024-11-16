import { ApiProperty, PartialType } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  expireIn: number;
}
