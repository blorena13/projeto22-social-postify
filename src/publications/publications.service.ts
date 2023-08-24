import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository){}
  
  create(body: CreatePublicationDto) {
    // return this.publicationsRepository.createPubli(body);
  }

  findAll() {
    return this.publicationsRepository.findAll();
  }

  findOne(id: number) {
    return this.publicationsRepository.findById(id);
  }

  update(id: number, body: UpdatePublicationDto) {
    return this.publicationsRepository.updatedPubli(id, body);
  }

  remove(id: number) {
    return this.publicationsRepository.removePubli(id);
  }
}
