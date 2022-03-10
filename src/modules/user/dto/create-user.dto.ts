import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  ValidateNested,
} from 'class-validator';
import { Role } from 'src/modules/auth/role/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'User must must have a name' })
  @Length(3)
  name: string;

  @IsNotEmpty({ message: 'User must have a email' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'User must must have a name' })
  @Length(3)
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty({ message: 'User must have a password' })
  @Length(6)
  password: string;
}
