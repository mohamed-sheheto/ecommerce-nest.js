import { HttpException, Injectable, NotFoundException, Request } from '@nestjs/common';
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
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`no user found for this id:${id}`);
    }

    return user;
  }

  async create(createUserDTO: CreateUserDto): Promise<object> {
    if(await this.userRepository.findOneBy({email: createUserDTO.email})) throw new HttpException("user already exist",400)

    const password = await bcrypt.hash(createUserDTO.password, 12); 

    const user = await this.userRepository.save({...createUserDTO, password})
    
    return {
      status: "success",
      statusCode: 200,
      data: user
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`no user found for this id:${id}`);
    }

    const updatedUser = { ...user, ...updateUserDTO };

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
