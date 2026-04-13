import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty({
    description: 'The ID of the chat',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'The updated message',
    example: 'New message',
  })
  message?: string;

  @ApiProperty({
    description: 'The updated sender ID',
    example: 1,
  })
  senderId?: number;

  @ApiProperty({
    description: 'The updated receiver ID',
    example: 2,
  })
  receiverId?: number;

  @ApiProperty({
    description: 'The updated date',
    example: '2022-01-01',
  })
  date?: Date;

  @ApiProperty({
    description: 'The updated time',
    example: '12:00:00',
  })
  time?: string;

  @ApiProperty({
    description: 'The updated status',
    example: 'sent',
  })
  status?: string;
}
