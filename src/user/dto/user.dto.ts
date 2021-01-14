import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(40)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  readonly password: string;
}
