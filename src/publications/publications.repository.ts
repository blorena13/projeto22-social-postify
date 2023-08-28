import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationsRepository{
    constructor(private readonly prisma: PrismaService){}

    createPubli(body: CreatePublicationDto) {
        return this.prisma.publications.create({
            data: body
        });
    }

    findAll() {
       return this.prisma.publications.findMany();
      }

    findById(id: number) {
        return this.prisma.publications.findFirst({where: {id}});
      }

    updatedPubli(id: number, body: UpdatePublicationDto) {
        return this.prisma.publications.update({
            where: {
                id
            }, data: body
        });
      }

    removePubli(id: number) {
        return this.prisma.publications.delete({where: {id}});
    }

    findExistingMedia(mediasId: number) {
      return this.prisma.medias.findFirst({where: {id: mediasId}});
    }

    findExistingPost(postId: number) {
      return this.prisma.post.findFirst({where: {id: postId}});
    }

    
}