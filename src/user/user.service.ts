import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<{ status: string, statusCode: number, data: User }> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`no user found for this id:${id}`);
    }

    return {
      status: "success",
      statusCode: HttpStatus.OK,
      data: user
    }
  }

  async create(createUserDTO: CreateUserDto): Promise<{ status: string, statusCode: number, data: User }> {
    if (await this.userRepository.findOneBy({ email: createUserDTO.email })) throw new HttpException("user already exist", 400)

    const password = await bcrypt.hash(createUserDTO.password, 12);

    const user = await this.userRepository.save({ ...createUserDTO, password })

    return {
      status: "success",
      statusCode: HttpStatus.CREATED,
      data: user
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDTO)
    : Promise<{ status: string, statusCode: number, data: User }> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`no user found for this id:${id}`);
    }

    if (updateUserDTO.password) {
      updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 12)
    }

    Object.assign(user, updateUserDTO)

    await this.userRepository.save(user)

    return {
      status: "success",
      statusCode: HttpStatus.OK,
      data: user
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`no user found for this id:${id}`);
    }

    await this.userRepository.delete(user.id);
  }
}
