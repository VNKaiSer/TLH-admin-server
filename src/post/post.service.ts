import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async gets() {
    return await this.postRepository.getAll();
  }

  async get(id: number) {
    return await this.postRepository.getById(id);
  }

  async create(post: PostDTO) {
    return await this.postRepository.create(post);
  }

  async update(id: number, post: PostDTO) {
    return await this.postRepository.update(id, post);
  }

  async delete(id: number) {
    return await this.postRepository.delete(id);
  }
}
