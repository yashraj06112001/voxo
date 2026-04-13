import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationDto } from './create-registration.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  @ApiProperty({
    example: 'NewStrongPassword123',
    description: 'Updated password of the user',
  })
  updatedPassword?: string;
  @ApiProperty({
    example: 'John Doe',
    description: 'Updated name of the user',
  })
  updatedName?: string;
}
