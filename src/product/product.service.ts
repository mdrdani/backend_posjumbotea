import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService){}

  /*

  */
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    let imagePath: string | undefined = undefined;

    if(file){
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if(!allowedMimeTypes.includes(file.mimetype)){
        throw new BadRequestException('invalid file type')
      }

      const maxSize = 1 * 1024 * 1024;
      if(file.size > maxSize){
        throw new BadRequestException('File is too large')
      }

      const filename = `${Date.now()}_${file.originalname}`;
      imagePath = `public/uploads/products/${filename}`

      const fs = await import('fs/promises')
      await fs.writeFile(imagePath, file.buffer)
    }

    const productData = {
      ...createProductDto,
      image: imagePath
    }
    // console.log(productData)

    const createProduct = await this.prisma.products.create({
      data: productData
    })
      return {
        statusCode: 200,
        message: 'Product Created Succesfully',
        data: createProduct
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

  async update(id: number, updateProductDto: UpdateProductDto, file?: Express.Multer.File) {
    let imagePath : string | undefined;

    const existingProduct = await this.prisma.products.findUnique({
      where: {id}
    });

    if(!existingProduct){
      throw new NotFoundException('Product not found')
    }

    if(file){
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if(!allowedMimeTypes.includes(file.mimetype)){
        throw new BadRequestException('invalid file type')
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize){
        throw new BadRequestException('file is to large')
      }

      const filename = `${Date.now()}_${file.originalname}`;
      imagePath =  `public/uploads/products/${filename}`

      const fs = await import('fs/promises')
      await fs.writeFile(imagePath, file.buffer);

      if(existingProduct.image){
        await fs.unlink(existingProduct.image).catch((err) => {
          console.warn(`failed to delete old image: ${err.message}`)
        })
      }
    }else{
      imagePath = existingProduct.image;
    }

    const updatedData = {
      ...updateProductDto,
      image: imagePath
    }

    const updateProduct = await this.prisma.products.update({
      where:{
        id: id
      },
      data: updatedData
    })
    
      return {
        statusCode: 200,
        message: 'School Updated successfully',
        data: updateProduct
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
