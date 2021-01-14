import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { GoogleStrategy } from './auth/google.strategy';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
