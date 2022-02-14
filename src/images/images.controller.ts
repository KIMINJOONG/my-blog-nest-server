import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/types/aws';
import { multerS3Options } from 'src/utils/multer.option';
import { ImagesService } from './images';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('images', null, multerS3Options))
  @Bind(UploadedFiles())
  async uploadFile(files: IFile[]): Promise<string[]> {
    return await files.map((v) => v.key);
  }
}
