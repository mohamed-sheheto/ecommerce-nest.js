import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { User } from 'src/user/user.entity';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @docs signup
  //@Route Post api/v1/auth/signup
  //@access public
  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto): Promise<{ status: string, statusCode: number, data: User, token: string }> {
    return this.authService.signUp(createAuthDto);
  }
}
