import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly desc: string;
}
