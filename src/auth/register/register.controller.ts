import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HashingCompare, HashingText } from 'prisma/utils/GenerateToken';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterService } from './register.service';

@Controller('api/auth/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @UsePipes(ValidationPipe)
  @Post('/')
  register(@Body() body: RegisterUserDto) {
    const passwordHash = HashingText(body.password);
    return this.registerService.register({
      email: body.email,
      password: passwordHash,
      username: body.username,
      name: body.name,
    });
  }
}
