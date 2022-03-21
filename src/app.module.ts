/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://uniondeveloper:uniondeveloper2021$$@cluster0.9xkag.mongodb.net/tienda-union?retryWrites=true&w=majority&ssl=true')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
