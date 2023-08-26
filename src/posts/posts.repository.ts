import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createPost(body: CreatePostDto) {
       return await this.prisma.post.create({
            data: body
        });
    }

    async findAll() {
        const allPosts = await this.prisma.post.findMany();

        const newPost = allPosts.map(post => {
            if(post.image !== null){
                return post;
            } else {
                const {image, ...postWithoutImage} = post;
                return postWithoutImage;
            }
        })
        return newPost;


    }

    async findById(id: number) {
        const posts = await this.prisma.post.findFirst({ where: { id } });
        if(posts.image !== null){
            return posts;
        } else {
            const {image, ...postWithoutImage} = posts;
            return postWithoutImage;
        }
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