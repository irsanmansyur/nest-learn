import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() username: string;
  password: string | '';
}
