import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

type PubliBody = {
    mediasId: number,
    postId: number,
    date: string;
};

export async function createPublication(app: INestApplication, body: PubliBody){
    return request(app.getHttpServer()).post('/publications').send(body);
}