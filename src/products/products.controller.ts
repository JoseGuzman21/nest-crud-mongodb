import { Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post('/')
  createPost(@Res() res) {
    return res.status(HttpStatus.OK).json({ message: 'Message ok' });
  }
}
