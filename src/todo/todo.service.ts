import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from '../user/entity/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { queryFailedGuard } from '../utils/error-guard';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, author: User): Promise<Todo> {
    const createdTodo = await this.todoRepo.create({
      ...createTodoDto,
      author,
    });
    if (CreateTodoDto) {
      await this.todoRepo.save(createdTodo);
      return createdTodo;
    }
    throw new HttpException('문제가 발생하였습니다.', HttpStatus.CONFLICT);
  }

  async getAllList(author: User): Promise<Todo[]> {
    const found = await this.todoRepo.find({
      where: { author },
      relations: ['author'],
      order: {
        createdOn: 'ASC',
      },
    });
    return found;
  }

  async editTodo(updateTodoDto: UpdateTodoDto, author: User): Promise<Todo> {
    const todo = await this.todoRepo.findOneOrFail({ where: { id: updateTodoDto.id, author: author } });
    if (!todo) {
      throw new HttpException(`ID: ${updateTodoDto.id} 의 Todo가 존재하지 않습니다.`, HttpStatus.CONFLICT);
    }
    await this.todoRepo.update({ id: updateTodoDto.id, author: author }, updateTodoDto);
    return await this.todoRepo.findOneOrFail({ where: { id: updateTodoDto.id } });
  }

  async deleteTodo(todoId: string, author: User): Promise<DeleteResult> {
    try {
      const todo = await this.todoRepo.findOne({ where: { id: todoId, author: author } });
      if (todo) {
        await todo.remove();
      }
      return { raw: 'success' };
    } catch (e: any) {
      if (queryFailedGuard(e)) {
        console.log('%c [JL] deleteTodo - e', 'font-size: 16px; color:  red;', e);
      }
    }
  }
}
