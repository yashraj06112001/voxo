import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatModel } from './entities/chat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel.name) private readonly chatModel: Model<ChatModel>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const savedChat = await this.chatModel.create(createChatDto);
    if (!savedChat) {
      throw new Error('Failed to create chat');
    }
    return savedChat;
  }

  async findOne(id: number) {
    const chat = await this.chatModel.findById(id).exec();
    if (!chat) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const updatedChat = await this.chatModel
      .findByIdAndUpdate(id, updateChatDto, { new: true })
      .exec();
    if (!updatedChat) {
      throw new Error(`Failed to update chat with id ${id}`);
    }
    return updatedChat;
  }

  async remove(id: number) {
    const result = await this.chatModel.findByIdAndRemove(id).exec();
    if (result.n === 0) {
      throw new Error(`Failed to remove chat with id ${id}`);
    }
  }
}
