import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(new AuthGuard(['ADMIN','STAFF']))
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    return await this.productService.create(createProductDto, file);
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF', 'USER']))
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return await this.productService.update(+id, updateProductDto, file);
  }

  @UseGuards(new AuthGuard(['ADMIN']))
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
