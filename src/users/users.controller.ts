import { Controller, Get, Header, HostParam, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  // @RequestMapping({ path: 'list', method: RequestMethod.GET })
  getUsersList(): Promise<User[]> {
    return this.usersService.getList();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    console.log(id);
    return this.usersService.getItem(id);
  }
}
