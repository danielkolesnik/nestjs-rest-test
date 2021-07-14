import { HttpException, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { first } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getList(): Promise<User[]> {
    const result: Promise<User[]> = this.usersRepository.find();

    return result;
  }

  async getItem(id: number): Promise<User> {
    try {
      const result = await this.usersRepository.findOneOrFail(id);

      return result;
    } catch (err) {
      throw new HttpException('Item not found', 404);
    }
  }

  async create(name: string): Promise<User> {
    const newUser = this.usersRepository.create({ name });

    return newUser;
  }
}
