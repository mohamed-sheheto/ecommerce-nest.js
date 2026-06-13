import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

  async signUp(createAuthDto: CreateAuthDto): Promise<{ status: string, statusCode: number, data: User, token: string }> {

    if (await this.userRepository.findOneBy({ email: createAuthDto.email })) throw new HttpException("user already exist", 400);

    const password = await bcrypt.hash(createAuthDto.password, 12);
    const user = await this.userRepository.save({ ...createAuthDto, password })

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload)

    return {
      status: "success",
      statusCode: HttpStatus.CREATED,
      data: user,
      token
    }
  }
}
