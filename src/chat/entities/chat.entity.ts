import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  message!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId!: number;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ enum: ['sent', 'received'], default: 'sent' })
  status!: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
