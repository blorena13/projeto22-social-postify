import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaModule } from "../src/prisma/prisma.module"
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as request from 'supertest';
import { createMedia } from "./factories/medias-factories"
import { createPost } from "./factories/posts-factories"

describe('posts test', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, PrismaModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    //clean do banco
    await prisma.publications.deleteMany();
    await prisma.medias.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
    });

    it('should post ', () => {
        return request(app.getHttpServer())
        .post('/posts')
        .send({
            title: "Why you should have a guinea pig?",
            text: "helloooooo",
        })
        .expect(HttpStatus.CREATED);
    });

    it('should get all posts', async () => {
        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});
        await createPost(app, {title: "facebook", text: "love u taylor swift <3"});

        const response = await request(app.getHttpServer()).get('/posts');
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toEqual({
            id: expect.any(Number),
            title: expect.any(String),
            text: expect.any(String)
        });
    });

    it('should return post by id', async () => {
        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});

        const posts = await prisma.post.findFirst({
            where: {
                title: "Instagram",
                text: "love u taylor swift <3"
            }
        });
        const response = await request(app.getHttpServer()).get(`/posts/${posts.id}`);
        expect(HttpStatus.OK);
    })

    it('should return 404 if id does not exists', async () => {
        const response = await request(app.getHttpServer()).get(`/posts/8`);
        expect(HttpStatus.NOT_FOUND);
    })

    it('should update post', async () => {
        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});

        const posts = await prisma.post.findFirst({
            where: {
                title: "Instagram",
                text: "love u taylor swift <3"
            }
        });
        const response = await request(app.getHttpServer()).put(`/posts/${posts.id}`).send({
            title: "facebook",
            text: "test",
        })
        expect(HttpStatus.OK);
    });

    it('should delete post', async () => {
        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});

        const posts = await prisma.post.findFirst({
            where: {
                title: "Instagram",
                text: "love u taylor swift <3"
            }
        });
        const response = await request(app.getHttpServer()).delete(`/posts/${posts.id}`);
        expect(HttpStatus.OK);
    })

})