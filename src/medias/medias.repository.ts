import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class MediasRepository {
    
    constructor(private readonly prisma: PrismaService) { }

    createMedia(body: CreateMediaDto) {
        return this.prisma.medias.create({
            data: body
        });
    }

    findAll() {
        return this.prisma.medias.findMany();
    }

    findById(id: number) {
        return this.prisma.medias.findFirst({where: {id: id}});
    }

    updatedMedia(id: number, body: UpdateMediaDto) {
        return this.prisma.medias.update({
            where: {
                id
            }, data: 
                body
            })
    }

    removeMedia(id: number) {
        return this.prisma.medias.delete({where: {id: id}});
    }

    findUsernameAndTitle(username: string, title: string) {
        return this.prisma.medias.findFirst({
            where: {
                username,
                title
            }
        })
      }


}