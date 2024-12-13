import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService){}

  /*

  */
  async create(createProductDto: CreateProductDto) {
    const createProduct = await this.prisma.products.create({
      data: createProductDto
    })

    if(createProduct){
      return {
        statusCode: 200,
        message: 'Product Created Succesfully',
        data: createProduct
      }
    }
  }


  async findAll() {
    const allProduct = await this.prisma.products.findMany()
    if(allProduct){
      return {
        statusCode: 200,
        message: 'Product Fetched Successfully',
        data: allProduct
      }
    }
  }


  async findOne(id: number) {
    const findProductId = await this.prisma.products.findFirst({
      where: {
        id: id
      }
    })

    if(!findProductId){
      throw new NotFoundException('Product Not found')
    }

    return {
      statusCode: 200,
      message: 'Product Fetched Successfully',
      data: findProductId
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.prisma.products.update({
      where:{
        id: id
      },
      data: updateProductDto
    })

    if(updateProduct){
      return {
        statusCode: 200,
        message: 'School Updated successfully',
        data: updateProduct
      }
    }
  }

  async remove(id: number) {
    const productfind = await this.prisma.products.findUnique({
      where: {
        id: id
      }
    })

    if(!productfind){
      throw new HttpException ('product not found', HttpStatus.NOT_FOUND)
    }

    const deleteProduct = await this.prisma.products.delete({
      where: {
        id: id
      }
    })
    
      return {
        statusCode: 200,
        message: 'School deleted successfully',
        data: deleteProduct
      }
  
  }
}
