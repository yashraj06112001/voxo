import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creator_id!: Types.ObjectId;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: Number, default: 0 })
  like!: number;

  @Prop({ type: Number, default: 0 })
  dislike!: number;

  @Prop({ type: [String], default: [] })
  comments!: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
