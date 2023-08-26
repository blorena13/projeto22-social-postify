import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
})
export class PublicationsModule {}
