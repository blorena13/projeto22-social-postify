import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaModule } from "../src/prisma/prisma.module"
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as request from 'supertest';
import { createMedia } from "./factories/medias-factories"
import { createPublication } from "./factories/publications-factories"
import { createPost } from "./factories/posts-factories"

describe('publications test', () => {
    let app: INestApplication;
    let prisma: PrismaService = new PrismaService();

    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, PrismaModule]
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    //clean do banco
    await prisma.publications.deleteMany();
    await prisma.medias.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
    });

    it('should post publication', async() => {
        const media = await prisma.medias.create({
            data: {
                title: "Instagram",
                username: "myusername"
            }
        })

        const post = await prisma.post.create({
            data: {
                title: "Instagram",
                text: "love u taylor swift <3"
            }
        })
        
        return request(app.getHttpServer())
        .post("/publications")
        .send({
            mediasId: media.id,
            postId: post.id,
            date: "2023-09-21T13:25:17.352Z"
        })
        .expect(HttpStatus.CREATED);
    });

    it('should get all publication', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"})
        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });

        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});
        const post = await prisma.post.findFirst({
            where: {
            title: "Instagram",
            text: "love u taylor swift <3"
        }
        })
        await createPublication(app, {mediasId: media.id, postId: post.id, date: "2023-09-21T13:25:17.352Z"});

        const response = await request(app.getHttpServer()).get('/publications');
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual({
            id: expect.any(Number),
            mediasId: expect.any(Number),
            postId: expect.any(Number),
            date: expect.any(String)
        });
    });

    it('should return publication by id', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});
        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });

        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});
        const post = await prisma.post.findFirst({
            where: {
            title: "Instagram",
            text: "love u taylor swift <3"
        }
        })
        await createPublication(app, {mediasId: media.id, postId: post.id, date: "2023-09-21T13:25:17.352Z"});

        const publi = await prisma.publications.findFirst({
            where: {
                mediasId: media.id, 
                postId: post.id, 
                date: "2023-09-21T13:25:17.352Z"
            }
        });

        const response = await request(app.getHttpServer()).get(`/publications/${publi.id}`);
        expect(response.status).toBe(HttpStatus.OK);
    })

    it('should return 404 if id does not exists', async () => {
        const response = await request(app.getHttpServer()).get(`/publications/8`);
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
    })

    it('should update publication', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});

        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });

        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});
        const post = await prisma.post.findFirst({
            where: {
            title: "Instagram",
            text: "love u taylor swift <3"
        }
        })

        await createPost(app, {title: "twitter", text: "love u taylor swift <3"});
        const post2 = await prisma.post.findFirst({
            where: {
            title: "twitter",
            text: "love u taylor swift <3"
        }
        })
        await createPublication(app, {mediasId: media.id, postId: post.id, date: "2023-09-21T13:25:17.352Z"});

        const publi = await prisma.publications.findFirst({
            where: {
                mediasId: media.id, 
                postId: post.id, 
                date: "2023-09-21T13:25:17.352Z"
            }
        });


        const response = await request(app.getHttpServer()).put(`/publications/${publi.id}`).send({
            mediasId: media.id, 
            postId: post2.id, 
            date: "2023-09-21T13:25:17.352Z"
        })
        expect(response.status).toBe(HttpStatus.OK);
    });

    it('should delete publications', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});

        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });

        await createPost(app, {title: "Instagram", text: "love u taylor swift <3"});
        const post = await prisma.post.findFirst({
            where: {
            title: "Instagram",
            text: "love u taylor swift <3"
        }
        })

        await createPublication(app, {mediasId: media.id, postId: post.id, date: "2023-09-21T13:25:17.352Z"});

        const publi = await prisma.publications.findFirst({
            where: {
                mediasId: media.id, 
                postId: post.id, 
                date: "2023-09-21T13:25:17.352Z"
            }
        });
        const response = await request(app.getHttpServer()).delete(`/publications/${publi.id}`);
        expect(response.status).toBe(HttpStatus.OK);
    })

})