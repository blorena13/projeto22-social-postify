import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaModule } from "../src/prisma/prisma.module"
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as request from 'supertest';
import { createMedia } from "./factories/medias-factories"

describe('medias Test', () => {
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

    it('should post a media', () => {
        return request(app.getHttpServer())
        .post('/medias')
        .send({
            title: "Instagram",
            username: "myusername",
        })
        .expect(HttpStatus.CREATED);
    });

    it('should get all medias', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});
        await createMedia(app, {title: "facebook", username: "myusername"});

        const response = await request(app.getHttpServer()).get('/medias');
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toEqual({
            id: expect.any(Number),
            title: expect.any(String),
            username: expect.any(String)
        });
    });

    it('should return media by id', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});

        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });
        const response = await request(app.getHttpServer()).get(`/medias/${media.id}`);
        expect(HttpStatus.OK);
    })

    it('should return 404 if id does not exists', async () => {
        const response = await request(app.getHttpServer()).get(`/medias/8`);
        expect(HttpStatus.NOT_FOUND);
    })

    it('should update media', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});

        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });
        const response = await request(app.getHttpServer()).put(`/medias/${media.id}`).send({
            title: "facebook",
            username: "myusername",
        })
        expect(HttpStatus.OK);
    });

    it('should delete media', async () => {
        await createMedia(app, {title: "Instagram", username: "myusername"});

        const media = await prisma.medias.findFirst({
            where: {
                title: "Instagram",
                username: "myusername"
            }
        });
        const response = await request(app.getHttpServer()).delete(`/medias/${media.id}`);
        expect(HttpStatus.OK);
    })

})