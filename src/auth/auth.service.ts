import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRespository: Repository<User>,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRespository.findOneBy({ email });
    if (user?.password !== password) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = { email: user.email, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
