import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtGuardModule } from 'src/guards/jwtAuthGuard/jwt.guard.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtGuardModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
