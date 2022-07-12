import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RegisterUserDto implements Prisma.UserCreateInput {
  @IsString() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString()
  @IsNotEmpty()
  @isUnique('username', 'user')
  username: string;

  @IsString()
  @IsNotEmpty()
  @matchesRequest('password_confirm', {
    message: 'Password Confirmation do not match',
  })
  @isUnique('email', 'user')
  password: string;
}

export function matchesRequest(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'matches',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue
          );
        },
      },
    });
  };
}

export function isUnique(
  property: string,
  table: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions
        ? validationOptions
        : { message: property + ' Harus Unik' },
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          let model = new PrismaService();

          const isExist = await model[table].findUnique({
            where: {
              [property]: relatedValue,
            },
          });
          return isExist ? false : true;
        },
      },
    });
  };
}
