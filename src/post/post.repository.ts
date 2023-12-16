import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { posts } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.posts.findMany({});
  }
  async getById(id: number) {
    return await this.prisma.posts
      .findUnique({
        where: {
          id,
        },
      })
      .then((result) => {
        return {
          mess: 'Get product successfully',
          data: result,
        };
      })
      .catch((err) => {
        return {
          mess: 'Get product failed',
          data: err,
        };
      });
  }
  async create(posts: any) {
    const post = await this.prisma.posts
      .create({
        data: posts,
      })
      .then((result) => {
        return {
          mess: 'Create product successfully',
          data: result,
        };
      })
      .catch((err) => {
        return {
          mess: 'Create product failed',
          data: err,
        };
      });
    console.log(post);
    return post;
  }

  async update(id: number, post: any) {
    return await this.prisma.posts
      .update({
        where: {
          id: id,
        },
        data: post,
      })
      .then((result) => {
        return {
          mess: 'Update product successfully',
          data: result,
        };
      })
      .catch((err) => {
        return {
          mess: 'Update product failed',
          data: err,
        };
      });
  }

  async delete(id: number) {
    return await this.prisma.posts.delete({
      where: {
        id: id,
      },
    });
  }
}
