import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository){}
  
  async create(body: CreateMediaDto) {
    if(!body.title || !body.username){
      throw new BadRequestException();
    }
    const existingMedia = await this.mediasRepository.findUsernameAndTitle(body.username, body.title);
    if(existingMedia !== null){
      throw new ConflictException();
    }
    return await this.mediasRepository.createMedia(body)
  }

  findAll() {
    return this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const findMedia = await this.mediasRepository.findById(id);
    if(findMedia === null){
      throw new NotFoundException();
    }
    return findMedia;
  }

  async update(id: number, body: UpdateMediaDto) {
    const existingMedia = await this.mediasRepository.findById(id);
    if(existingMedia === null){
      throw new NotFoundException();
    }
    const existingMediaByTitle = await this.mediasRepository.findUsernameAndTitle(body.username, body.title);
    if(existingMediaByTitle !== null){
      throw new ConflictException();
    }
    return this.mediasRepository.updatedMedia(id, body);
  }

  async remove(id: number) {
    const existingMedia = await this.mediasRepository.findById(id);
    if(existingMedia === null){
      throw new NotFoundException();
    }
    return this.mediasRepository.removeMedia(id);
  }
}
