import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body() body: CreateMediaDto) {
    return this.mediasService.create(body);
  }

  @Get()
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mediasService.findOne(+id);
    }catch(error){
      throw new HttpException('not found', HttpStatus.NOT_FOUND)
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateMediaDto) {
    return this.mediasService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}
