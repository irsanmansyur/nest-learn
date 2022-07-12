import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() username: string;
  password: string | undefined;
}
