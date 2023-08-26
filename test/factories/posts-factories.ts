import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

type PostBody = {
    title: string,
    text: string;
};

export async function createPost(app: INestApplication, body: PostBody){
    return request(app.getHttpServer()).post('/posts').send(body);
}