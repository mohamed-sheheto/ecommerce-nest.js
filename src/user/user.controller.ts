import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtGuard } from './guards/jwt.auth.guard';
import { QueryDto } from 'src/common/dtos/query.dto';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @docs Admin can get all users
  //@Route Get api/v1/users
  //@access private [admin]
  @Get()
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  async findAll(@Query() query: QueryDto): Promise<object> {
    return this.userService.findAll(query);
  }

  // @docs Admin can get one user by its id
  //@Route Get api/v1/users/:id
  //@access private [admin]
  @Get(':id')
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<{ status: string, statusCode: number, data: User }> {
    return this.userService.findOne(id);
  }


  // @docs Admin can create user
  //@Route Post api/v1/users
  //@access private [admin]
  @Post()
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<{ status: string, statusCode: number, data: User }> {
    return this.userService.create(createUserDto);
  }

  // @docs Admin can udpate user by id
  //@Route Post api/v1/users/:id
  //@access private [admin]
  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ): Promise<{ status: string, statusCode: number, data: User }> {
    return this.userService.update(id, UpdateUserDTO);
  }

  // @docs Admin can delete user by id
  //@Route Post api/v1/users/:id
  //@access private [admin]
  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
