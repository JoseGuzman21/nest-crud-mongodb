/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';
import { Response } from 'express';
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productsService.getProducts();
        
        return res.status(HttpStatus.OK).json({ message: 'Products get successfully', data: products });
    }

    @Get('/:productId')
    async getProduct(@Res() res: Response, @Param('productId') productId) {
        const productFound = await this.productsService.getProduct(productId);
        
        if (!productFound) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Product not found', data: {} });
        
        return res.status(HttpStatus.OK).json({ message: 'Product get successfully', data: productFound });
    }

    @Post('/create')
    async createPost(@Res() res: Response, @Body() createProductDTO: CreateProductDTO) {
        const addedProduct = await this.productsService.createProduct(createProductDTO);
        
        return res.status(HttpStatus.CREATED).json({ message: 'Product added successfully', data: addedProduct });
    }

    @Put('/update/:productId')
    async updatedProduct(@Res() res: Response, @Param('productId') productId, @Body() createProductDTO: CreateProductDTO) {
        const updatedProduct = await this.productsService.updateProduct(productId, createProductDTO);
        
        if (!updatedProduct) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Product not found', data: {} });
        
        return res.status(HttpStatus.OK).json({ message: 'Product updated successfully', data: updatedProduct });
    }

    @Delete('/delete')
    async deletedProduct(@Res() res: Response, @Query('productId') productId) {
        const deletedProduct = await this.productsService.deleteProduct(productId);

        if (!deletedProduct) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Product not found', data: {} });

        return res.status(HttpStatus.OK).json({ message: 'Product deleted successfully', data: deletedProduct });
    }
}
