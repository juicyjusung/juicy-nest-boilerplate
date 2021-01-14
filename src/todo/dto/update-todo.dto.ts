import { IsBoolean, IsEnum, IsString, IsUUID, MaxLength } from 'class-validator';
import { TodoStatus } from '../entity/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly desc: string;

  @ApiProperty()
  @IsBoolean()
  readonly status: boolean;
}
