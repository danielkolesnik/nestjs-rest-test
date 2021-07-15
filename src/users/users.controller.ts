import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO, UserEditDTO, UserViewDTO } from './users.dto';
import { NameFilteredRequest } from '../utils/filtered-request';
import { UsersFilteredResponse } from '../utils/filtered-response';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @RequestMapping({ path: 'list', method: RequestMethod.GET })
  @Get()
  @ApiOperation({ summary: 'Get Users List' })
  @ApiResponse({ type: [UserViewDTO] })
  getUsersList(): Promise<UserViewDTO[]> {
    return this.usersService.getList();
  }

  @Post('filter')
  @ApiOperation({ summary: 'Get Users List Filtered' })
  @ApiResponse({ type: UsersFilteredResponse })
  @ApiBody({ type: NameFilteredRequest })
  getUsersFiltered(
    @Body() filteredRequest: NameFilteredRequest,
  ): Promise<UsersFilteredResponse> {
    return this.usersService.getListFiltered(filteredRequest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Details' })
  @ApiResponse({ type: UserViewDTO })
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getItem(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new Users' })
  @ApiBody({ type: UserCreateDTO })
  @ApiResponse({ type: UserEditDTO })
  createUser(@Body() newUserDTO: UserCreateDTO): Promise<UserEditDTO> {
    return this.usersService.create(newUserDTO);
  }

  @Put()
  @ApiOperation({ summary: 'Update existing User' })
  @ApiBody({ type: UserEditDTO })
  @ApiResponse({ type: UserEditDTO })
  updateUser(@Body() userDTO: UserEditDTO): Promise<UserEditDTO> {
    return this.usersService.update(userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing User' })
  @ApiResponse({ type: Number })
  deleteUser(@Param('id') id: number): Promise<number> {
    return this.usersService.delete(id);
  }
}
