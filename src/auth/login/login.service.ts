import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private dbService: PrismaService) {}

  /**
   * Login service method
   * @param data
   */
  login(data: LoginDto) {
    return this.dbService.user.findUnique({
      where: {
        username: data.username,
      },
    });
  }
}
