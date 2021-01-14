import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'guest@gmail.com' })
  @IsString()
  @IsEmail()
  @MaxLength(40)
  readonly email: string;

  @ApiProperty({ example: 'guest' })
  @IsString()
  @MaxLength(40)
  readonly name: string;

  @ApiProperty({ example: 'guest' })
  @IsString()
  @MaxLength(40)
  readonly password: string;
}
