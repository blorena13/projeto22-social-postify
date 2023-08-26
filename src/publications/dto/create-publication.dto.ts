import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePublicationDto {
    @IsNumber()
    @IsNotEmpty()
    mediasId: number;

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsDate()
    @IsNotEmpty()
    date: string;
}
