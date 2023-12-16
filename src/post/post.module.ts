import { PrismaService } from '@app/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PostRepository, PrismaService],
  controllers: [PostController],
})
export class PostModule {}
