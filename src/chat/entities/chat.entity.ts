import { Schema, model } from 'mongoose';

export const ChatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['sent', 'received'],
    default: 'sent',
  },
});

export const ChatModel = model('Chat', ChatSchema);
