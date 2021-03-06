import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auths.module';
import { BoardsModule } from './boards/boards.module';
import { CategoriesModule } from './categories/categories.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { Board } from './boards/board.entity';
import { Category } from './categories/category.entity';
import Hashtag from './hashtags/hashtag.entity';
import BoardHashtag from './boardHashtags/BoardHashtag';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [User, Board, Category, Hashtag, BoardHashtag],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BoardsModule,
    CategoriesModule,
    HashtagsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
