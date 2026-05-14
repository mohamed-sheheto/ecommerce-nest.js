import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v7 as uuidv7 } from 'uuid'
export enum role {
  'user',
  'admin',
}
export enum gender {
  'male',
  'female',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv7();

  @Column()
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(20, { message: 'name must be at most 20 characters' })
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @MinLength(8, { message: 'password must be at least 8 characters' })
  @MaxLength(20, { message: 'password must be at most 20 characters' })
  @IsNotEmpty()
  password: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: role;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: gender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
