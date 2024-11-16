import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  create(user: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      fullName: user.fullName,
      email: user.email,
      password: hashSync(user.password, 10),
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, user: UpdateUserDto): User {
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

  delete(id: string): User[] {
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
