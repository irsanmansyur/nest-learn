import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get Users Api
   * @returns
   */
  @Get()
  async users() {
    return await this.userService.getUsers();
  }

  /**
   * Create User
   * @param data
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  /**
   * Update Data User
   * @param id User id
   * @param body
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Patch('/:id')
  async updateUser(@Param('id', ParseIntPipe) id, @Body() body: UpdateUserDto ) {
    return await this.userService.updateUser(id, body);
  }

  /**
   * Delete User
   * @param id
   * @returns
   */
  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    return await this.userService.deleteUser(id);
  }
}
