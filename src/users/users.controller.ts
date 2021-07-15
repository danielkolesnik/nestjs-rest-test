import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @RequestMapping({ path: 'list', method: RequestMethod.GET })
  getUsersList(): Promise<User[]> {
    return this.usersService.getList();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    console.log(id);
    return this.usersService.getItem(id);
  }

  @Post()
  createUser(@Body() newUserDTO: User): Promise<User> {
    console.log(newUserDTO);
    return this.usersService.create(newUserDTO);
  }

  @Put()
  updateUser(@Body() userDTO: User): Promise<User> {
    console.log(userDTO);
    return this.usersService.update(userDTO);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<number> {
    return this.usersService.delete(id);
  }
}
