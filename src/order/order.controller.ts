import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto){
        return this.orderService.createOrder(createOrderDto);
    }

    @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
    @UseGuards(AuthGuard)
    @Get()
    async allOrder(){
        return this.orderService.allOrder();
    }

    @UseGuards(new AuthGuard(['ADMIN', 'STAFF']))
    @Get(':id')
    async getOrderById(@Param('id') id: string){
        const orderId = parseInt(id, 10)
        return this.orderService.viewOrderDetail(orderId);
    }
}
