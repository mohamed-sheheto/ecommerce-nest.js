import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { gender, role } from '../user.entity';

export class CreateUserDto {
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

  @IsEnum(role, { message: 'role is either user or admin' })
  role: role;

  @IsUrl({}, { message: 'avatar must a valid url' })
  @IsOptional()
  avatar: string;

  @IsNumber({}, { message: 'age must be a number' })
  @Min(12, { message: 'age must be at least 12' })
  age: number;

  @IsPhoneNumber('EG', { message: 'phonenumber must be a valid phone number' })
  phoneNumber: string;

  @IsString({ message: 'address must be a string' })
  @IsOptional()
  address: string;

  @IsBoolean({ message: 'active either true or false' })
  @IsOptional()
  active: boolean;

  @IsString()
  @IsOptional()
  @Length(6, 6, { message: 'verification code must be 6 characters' })
  verificationCode: string;

  @IsEnum(gender, { message: 'gender either male or female' })
  gender: gender;
}
