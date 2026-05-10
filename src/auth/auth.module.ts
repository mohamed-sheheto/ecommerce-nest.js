import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtGuardModule } from 'src/guards/jwtAuthGuard/jwt.guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, JwtGuardModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
