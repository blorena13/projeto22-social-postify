import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository){}
  
  create(body: CreatePostDto) {
    return this.postsRepository.createPost(body);;
  }

  findAll() {
    return this.postsRepository.findAll();
  }

  findOne(id: number) {
    return this.postsRepository.findById(id);
  }

  update(id: number, body: UpdatePostDto) {
    return this.postsRepository.updatedPost(id, body);
  }

  remove(id: number) {
    return this.postsRepository.deletePost(id);
  }
}
