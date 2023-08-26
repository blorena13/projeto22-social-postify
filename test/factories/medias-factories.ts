import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

type MediasBody = {
    title: string,
    username: string;
};

export async function createMedia(app: INestApplication, body: MediasBody){
    return request(app.getHttpServer()).post('/medias').send(body);
}