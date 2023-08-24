import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) { }

    createPost(body: CreatePostDto) {
        return this.prisma.post.create({
            data: body
        });
    }

    findAll() {
        return this.prisma.post.findMany();
    }

    findById(id: number) {
        return this.prisma.post.findMany({ where: { id } })
    }

    updatedPost(id: number, body: UpdatePostDto) {
        return this.prisma.post.update({
            where: {
                id
            }, data: body
        })
    }

    deletePost(id: number) {
        return this.prisma.post.delete({where: {id}});
    }
}