import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository){}
  
  async create(body: CreatePublicationDto) {
    if(!body.mediasId || !body.postId || !body.date){
      throw new BadRequestException();
    }
    const existingMediaId = await this.publicationsRepository.findExistingMedia(body.mediasId);
    const existingPostId = await this.publicationsRepository.findExistingPost(body.postId);
    if(existingMediaId === null || existingPostId === null){
      throw new NotFoundException();
    }
     const result = await this.publicationsRepository.createPubli(body);
     return result;
  }

  findAll() {
    return this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    const findPubli = await this.publicationsRepository.findById(id);
    if(findPubli === null){
      throw new NotFoundException();
    }
    return findPubli;
  }

  async update(id: number, body: UpdatePublicationDto) {

    const findPubli = await this.publicationsRepository.findById(id);
    const existsMediaId = await this.publicationsRepository.findExistingMedia(body.mediasId);
    const existisPostId = await this.publicationsRepository.findExistingPost(body.postId);

    if(findPubli === null || existsMediaId === null || existisPostId === null){
      throw new NotFoundException();
    }
    
    return this.publicationsRepository.updatedPubli(id, body);
  }

  async remove(id: number) {

    const existingPubli = await this.publicationsRepository.findById(id);
    if(existingPubli === null){
      throw new NotFoundException();
    }
    return this.publicationsRepository.removePubli(id);
  }
}
