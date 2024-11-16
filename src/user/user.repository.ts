import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  private users: User[] = [];
  private currentId: number = 0;

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(user: CreateUserDto): User {
    const newUser: User = new User(this.currentId++, user.fullName, user.email);
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UpdateUserDto): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1 || !index)
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    const updatedUser = {
      ...this.users[index],
      ...user,
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id: number): User[] {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1 || !index)
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    this.users.splice(index, 1);
    return this.users;
  }
}
