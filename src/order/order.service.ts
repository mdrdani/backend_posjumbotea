import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class OrderService {
    constructor(
        private prismaService: PrismaService,
        @Inject(REQUEST) private req: any,    
    ){}

    async createOrder(createOrderDto: CreateOrderDto){
        const { kasirId, payment_method, total_price, total_item, orderItems } = createOrderDto;

        return this.prismaService.$transaction(async (prisma) => {
            const newOrder = await prisma.orders.create({
                data: {
                    kasirId,
                    payment_method,
                    total_price,
                    total_item
                },
            });

            const createdOrderItems = await Promise.all(
                orderItems.map((item) => 
                    prisma.orderItem.create({
                        data: {
                            orderId: newOrder.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            total_price: item.total_price
                        }
                    })
                )
            );

            return {
                ...newOrder,
                orderItems: createdOrderItems
            }
        })
    }

    async allOrder(){
        const allOrder = await this.prismaService.orders.findMany({
            where: {
                kasirId: this.req.user.id
            },
            select:{
                id: true,
                kasirId: true,
                total_price: true,
                total_item: true,
                payment_method: true,
                createdAt: true,
                transaction_time: true,
                orderItem: true
            }
        })
        if(allOrder){
            return {
                status: 'success',
                message: 'All order data',
                data: allOrder
            }
        }
    }
}
