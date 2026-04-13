import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: any,
  ) {
    const chat = await this.chatService.create(createChatDto);
    client.send('newChatCreated', chat);
    return chat;
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  async update(
    @MessageBody() updateChatDto: UpdateChatDto,
    @ConnectedSocket() client: any,
  ) {
    const updatedChat = await this.chatService.update(
      updateChatDto.id,
      updateChatDto,
    );
    client.send('chatUpdated', updatedChat);
    return updatedChat;
  }

  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: number, @ConnectedSocket() client: any) {
    await this.chatService.remove(id);
    client.send('chatRemoved', id);
    return { message: `Chat with id ${id} has been removed` };
  }
}
