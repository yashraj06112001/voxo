import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 'Updated post content',
    description: 'Updated text content of the post',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: 10,
    description: 'Number of likes',
    required: false,
  })
  like?: number;

  @ApiProperty({
    example: 2,
    description: 'Number of dislikes',
    required: false,
  })
  dislike?: number;

  @ApiProperty({
    example: ['Great post!', 'Nice one!'],
    description: 'List of comments on the post',
    required: false,
  })
  comments?: string[];
}
