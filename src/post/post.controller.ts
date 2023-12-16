import { PostDTO } from './dto/post.dto';
import { Respone } from '@app/common/common.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private service: PostService) {}
  @Get()
  async gets(): Promise<Respone> {
    return this.service
      .gets()
      .then((result) => {
        return {
          success: true,
          message: 'Lấy danh sách bài báo thành công',
          status: HttpStatus.OK,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Post()
  @ApiBody({
    type: PostDTO,
    description: 'Tạo bài báo',
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài báo thành công',
  })
  @ApiResponse({
    status: 400,
    description: '500 - Internal Server Error',
  })
  async create(@Body() post: PostDTO): Promise<Respone> {
    return this.service
      .create(post)
      .then(() => {
        return {
          success: true,
          message: 'Thêm bài báo thành công',
          status: HttpStatus.CREATED,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Put(':id')
  @ApiBody({
    type: PostDTO,
    description: 'Cập nhật bài báo',
  })
  @ApiResponse({
    status: 201,
    description: 'Cập nhật bài báo công',
  })
  @ApiResponse({
    status: 400,
    description: '500 - Internal Server Error',
  })
  async update(
    @Param('id') id: string,
    @Body() post: PostDTO,
  ): Promise<Respone> {
    return this.service
      .update(Number(id), post)
      .then((result) => {
        return {
          success: true,
          message: 'Cập nhật bài báo thành công',
          status: HttpStatus.OK,
          data: result,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Respone> {
    return this.service
      .delete(Number(id))
      .then(() => {
        return {
          success: true,
          message: 'Xóa bài báo thành công',
          status: HttpStatus.OK,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
        };
      });
  }
}
