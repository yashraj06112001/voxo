import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = await this.postModel.create(createPostDto);
    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts: Post[] = await this.postModel.find().exec();
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post: Post | null = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async findByCreator(creatorId: string): Promise<Post[]> {
    const posts: Post[] = await this.postModel
      .find({ creator_id: creatorId })
      .exec();
    return posts;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updated: Post | null = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return updated;
  }

  async addComment(id: string, comment: string): Promise<Post> {
    const post: Post | null = await this.postModel
      .findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async remove(id: string): Promise<void> {
    const result: Post | null = await this.postModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
