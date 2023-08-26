import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository){}
  
  create(body: CreatePostDto) {
    if(!body.title || !body.text){
      throw new BadRequestException();
    }
    return this.postsRepository.createPost(body);
  }

  findAll() {
    return this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const findPost = await this.postsRepository.findById(id);
    if(findPost === null){
      throw new NotFoundException();
    }
    return findPost;
  }

  async update(id: number, body: UpdatePostDto) {
    const existingPost = await this.postsRepository.findById(id);
    if(existingPost === null){
      throw new NotFoundException();
    }

    return this.postsRepository.updatedPost(id, body);
  }

  async remove(id: number) {
    const existingPost = await this.postsRepository.findById(id);
    if(existingPost === null){
      throw new NotFoundException();
    }
    return this.postsRepository.deletePost(id);
  }
}
