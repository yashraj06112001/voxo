import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: '64b1f23c8f1b2c001e4a1234',
    description: 'ID of the user creating the post',
  })
  creator_id!: string;

  @ApiProperty({
    example: 'This is my first post!',
    description: 'Text content of the post',
  })
  content!: string;
}
