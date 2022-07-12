import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(private dbService: PrismaService) {}

  register(data: RegisterDataInterface) {
    return this.dbService.user.create({ data });
  }
}

interface RegisterDataInterface {
  email: string;
  password: string;
  name: string;
  username: string;
}
