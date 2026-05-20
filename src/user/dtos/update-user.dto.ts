import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDTO extends PartialType(PickType(CreateUserDto, ['name', 'email', 'password', 'address', 'avatar', 'phoneNumber', 'age'] as const)) {
}
