import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(20, { message: 'name must be at most 20 characters' })
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'password must be at least 8 characters' })
  @MaxLength(20, { message: 'password must be at most 20 characters' })
  password: string;
}
