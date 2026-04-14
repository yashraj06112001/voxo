import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all posts' })
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a single post by id' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('creator/:creatorId')
  @ApiResponse({ status: 200, description: 'Returns all posts by a creator' })
  async findByCreator(@Param('creatorId') creatorId: string) {
    return this.postService.findByCreator(creatorId);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Patch(':id/comment')
  @ApiResponse({ status: 200, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async addComment(@Param('id') id: string, @Body('comment') comment: string) {
    return this.postService.addComment(id, comment);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return { message: `Post with id ${id} deleted successfully` };
  }
}
