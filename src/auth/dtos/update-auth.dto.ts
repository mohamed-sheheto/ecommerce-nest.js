import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateUserDTO extends PartialType(CreateAuthDto) { }
