import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HashingCompare } from 'prisma/utils/GenerateToken';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('api/auth/login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post('')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto) {
    let user = await this.loginService.login(body);

    // cek password is valid
    const passwordIsValid = await HashingCompare(body.password, user.password);
  }
}
