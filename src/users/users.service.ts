import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
// local dependencies
import { User } from './users.model';
import { UserCreateDTO, UserEditDTO, UserViewDTO } from './users.dto';
import { UsersFilteredResponse } from '../utils/filtered-response';
import { NameFilteredRequest } from '../utils/filtered-request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getList(): Promise<UserViewDTO[]> {
    const items = await this.usersRepository.find();

    // Convert Entities List to DTOs List
    const result = items.map((item) => UserViewDTO.of(item));

    return result;
  }

  async getListFiltered(
    filteredRequest: NameFilteredRequest,
  ): Promise<UsersFilteredResponse> {
    const filteredResponse = new UsersFilteredResponse();

    const namePattern =
      filteredRequest.filter && filteredRequest.filter.name
        ? filteredRequest.filter.name
        : '';

    // Paged result is an array with entities and count
    const pagedResult = await this.usersRepository.findAndCount({
      take: filteredRequest.size,
      skip: filteredRequest.size * filteredRequest.page,
      where: { name: Like('%' + namePattern + '%') },
      order: { id: 'ASC' },
    });
    // Convert Entities to DTOs List
    pagedResult[0] = pagedResult[0].map((item) => UserViewDTO.of(item));

    // Update filteredResponse with request data and results
    filteredResponse.fromRequestAndPaged(filteredRequest, pagedResult);

    return filteredResponse;
  }

  async getItem(id: number): Promise<User> {
    try {
      const result = await this.usersRepository.findOneOrFail(id);

      return result;
    } catch (err) {
      throw new HttpException('Item not found', 404);
    }
  }

  async create(newUserDTO: UserCreateDTO): Promise<UserEditDTO> {
    // Create new Item
    const newUser = this.usersRepository.create(newUserDTO);
    const savedResult = await this.usersRepository.save(newUser);

    // Convert Entity to DTO
    const result = UserEditDTO.of(savedResult);

    return result;
  }

  async update(userDTO: UserEditDTO): Promise<UserEditDTO> {
    if (!userDTO.id) {
      throw new BadRequestException(
        `Expecting a valid "id", but got [${userDTO.id}]!`,
      );
    }
    const existingUser = await this.getItem(userDTO.id);

    // Update editable fields
    existingUser.name = userDTO.name;
    const savedResult = await this.usersRepository.save(existingUser);

    // Convert Entity to DTO
    const result = UserEditDTO.of(savedResult);

    return result;
  }

  async delete(id: number): Promise<number> {
    if (!id) {
      throw new BadRequestException(`Expecting a valid "id", but got [${id}]!`);
    }

    const existingUser = await this.getItem(id);

    await this.usersRepository.delete(existingUser.id);

    return existingUser.id;
  }
}
