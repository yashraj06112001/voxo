import { ApiProperty } from '@nestjs/swagger';

export class FindAllRegistrationDto {
  @ApiProperty({
    example: '11wq@dafafr',
    description: 'id of the user',
  })
  identity!: string;
  @ApiProperty({
    example: 'John Doe',
    description: 'name of the user',
  })
  name_of_the_user!: string;
  @ApiProperty({
    example: '+1234567890',
    description: 'phone number of the user',
  })
  phone_number_of_the_user!: string;
}
