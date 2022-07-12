import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private dbService: PrismaService) {}

  /**
   * Return all user
   * @returns
   */
  async getUsers(): Promise<any> {
    return await this.dbService.user.findMany();
  }

  /**
   * Create new User
   * @param data
   * @returns
   */
  async createUser(data: CreateUserDto) {
    return await this.dbService.user.create({ data });
  }

  /**
   * Update data user
   * @param id User id
   * @param data User data
   */
  async updateUser(id: number, data: any) {
    return await this.dbService.user.update({ where: { id }, data });
  }

  /**
   * Delete User Service
   * @param id User id
   * @returns
   */
  async deleteUser(id: number) {
    return await this.dbService.user.delete({ where: { id } });
  }
}
