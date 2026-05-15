import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt'
import { QueryDto } from 'src/common/dtos/query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async findAll(@Query() query: QueryDto): Promise<object> {
    const { page, limit, search, sortBy, order } = query
    const queryBuilder = this.userRepository.createQueryBuilder("user");

    if (search) queryBuilder.andWhere('(user.name ILIKE :search OR user.email ILIKE :search)', { search: `%${search}%` })

    const allowedCols: string[] = ['name', 'email', 'createdAt']
    const col = allowedCols.includes(sortBy) ? sortBy : 'createdAt';
    queryBuilder.orderBy(`user.${col}`, order)


    const total = await queryBuilder.getCount()
    const data = await queryBuilder.skip((page - 1) * limit).take(limit).getMany()

    return {
      meta: {
        results: total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
      data: {
        data
      }
    };
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
