import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const savedChat: Chat = await this.chatModel.create(createChatDto);
    if (!savedChat) {
      throw new Error('Failed to create chat');
    }
    return savedChat;
  }

  async findAll(): Promise<Chat[]> {
    const chats: Chat[] = await this.chatModel.find().exec();
    return chats;
  }

  async findOne(id: number): Promise<Chat> {
    const chat: Chat | null = await this.chatModel.findById(id).exec();
    if (!chat) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const updatedChat: Chat | null = await this.chatModel
      .findByIdAndUpdate(id, updateChatDto, { new: true })
      .exec();
    if (!updatedChat) {
      throw new Error(`Failed to update chat with id ${id}`);
    }
    return updatedChat;
  }

  async remove(id: number): Promise<void> {
    const result: Chat | null = await this.chatModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new Error(`Failed to remove chat with id ${id}`);
    }
  }
}
