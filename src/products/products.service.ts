/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';
// import { ObjectId } from 'mongoose';
@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') readonly productModel: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        const products: Product[] = await this.productModel.find();
        return products;
    }

    async getProduct(productId: string): Promise<Product> {
        const productFound: Product = await this.productModel.findById(productId);
        return productFound;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const addedProduct = new this.productModel(createProductDTO);
        await addedProduct.save();
        return addedProduct;
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId, createProductDTO, { new: true });
        return updatedProduct;
    }

    async deleteProduct(productId: string): Promise<Product> {
        const deletedProduct: Product = await this.productModel.findByIdAndDelete(productId);
        return deletedProduct;
    }
}
