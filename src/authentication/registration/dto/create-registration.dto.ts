import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistrationDto {
  @ApiProperty({
    example: '9876543210',
    description: 'Phone number of the user',
  })
  phone!: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Password of the user',
  })
  password!: string;

  @ApiProperty({
    example: 'Yash',
    description: 'Name of the user',
  })
  name!: string;
}
