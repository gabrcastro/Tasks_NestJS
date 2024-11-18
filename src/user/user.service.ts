import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) throw new ConflictException('User already exists');

    const newUser: UserEntity = {
      id: uuid(),
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: hashSync(createUserDto.password, 10),
    };

    await this.userRepository.save(newUser);

    return newUser;
  }

  async findAll(): Promise<ResponseUserDto[] | null> {
    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException('Users not found');

    return users;
  }

  async findOne(id: string): Promise<ResponseUserDto | null> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<AuthUserDto | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    console.log('user by email: ', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1 || !index)
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );

    const updatedUser = {
      ...this.users[index],
      ...updateUserDto,
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async remove(id: string): Promise<User[] | null> {
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
