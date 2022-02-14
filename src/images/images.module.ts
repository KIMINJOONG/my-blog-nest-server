import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesService } from './images';
import { ImagesController } from './images.controller';

@Module({
  imports: [SequelizeModule.forFeature([])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
