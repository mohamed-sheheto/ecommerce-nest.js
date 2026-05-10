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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtGuard } from './guards/jwt.auth.guard';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
