import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    example: 'This is the content of the chat',
    description: 'The content of the chat',
  })
  message!: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the sender',
  })
  senderId!: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the receiver',
  })
  receiverId!: number;

  @ApiProperty({
    example: '2022-01-01T12:00:00Z',
    description: 'The date and time of the chat',
  })
  date!: string;

  @ApiProperty({
    example: '12:00:00',
    description: 'The time of the chat',
  })
  time!: string;
}
