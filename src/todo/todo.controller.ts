import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createTodo(@Req() req: any, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(createTodoDto, req.user);
  }

  @Put()
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async editTodo(@Req() req: any, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoService.editTodo(updateTodoDto, req.user);
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteTodo(@Req() req: any, @Param() { id }: { id: string }): Promise<DeleteResult> {
    return await this.todoService.deleteTodo(id, req.user);
  }

  @Get('/list')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiResponse({ description: 'hi', status: 200 })
  @UseGuards(AuthGuard('jwt'))
  async getTodoList(@Req() req: any): Promise<Todo[]> {
    return await this.todoService.getAllList(req.user);
  }
}
