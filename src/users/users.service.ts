import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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

  async create(newUser: User): Promise<User> {
    if (newUser.id) {
      throw new BadRequestException('Id must be null!');
    }
    // const existingUser = await this.usersRepository.findOne({ name: newUserDTO.name });
    // if (existingUser) {
    //   throw new BadRequestException(`User with name ${newUserDTO.name} already exists`)
    // }
    // From DTO to User
    // const newUser = this.usersRepository.create(newUserDTO);
    // const savedResult = await this.usersRepository.save(newUser);s
    const savedResult = await this.usersRepository.save(newUser);

    return savedResult;
  }

  async update(user: User): Promise<User> {
    if (!user.id) {
      throw new BadRequestException(
        `Expecting a valid "id", but got [${user.id}]!`,
      );
    }
    const existingUser = await this.getItem(user.id);
    // update some updatable fields
    existingUser.name = user.name;
    const savedResult = this.usersRepository.save(existingUser);

    return savedResult;
  }

  async delete(id: number): Promise<number> {
    if (!id) {
      throw new BadRequestException(`Expecting a valid "id", but got [${id}]!`);
    }

    const existingUser = await this.getItem(id);

    this.usersRepository.delete(existingUser.id);

    return existingUser.id;
  }
}
