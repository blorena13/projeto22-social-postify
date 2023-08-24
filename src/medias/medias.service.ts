import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository){}
  
  create(body: CreateMediaDto) {
    return this.mediasRepository.createMedia(body)
  }

  findAll() {
    return this.mediasRepository.findAll();
  }

  findOne(id: number) {
    return this.mediasRepository.findById(id);
  }

  update(id: number, body: UpdateMediaDto) {
    return this.mediasRepository.updatedMedia(id, body);
  }

  remove(id: number) {
    return this.mediasRepository.removeMedia(id);
  }
}
