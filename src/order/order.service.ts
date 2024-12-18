import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
        const { payment_method, total_price, total_item, orderItems } = createOrderDto;
        const kasirId = this.req.user.id;

        return this.prismaService.$transaction(async (prisma) => {
            const newOrder = await prisma.orders.create({
                data: {
                    kasirId,
                    payment_method,
                    total_price,
                    total_item
                },
            });

            // check order
            const updatedOrderItems = await Promise.all(
                orderItems.map(async (item) => {
                    const product = await prisma.products.findUnique({
                        where: { id: item.productId}
                    });

                    if (!product) {
                        throw new BadRequestException(`Product with ID ${item.productId} not found.`);
                    }
            
                    if (product.stock < item.quantity) {
                        throw new BadRequestException(`Not enough stock for product ID ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`);
                    }

                    await prisma.products.update({
                        where:{id: item.productId},
                        data: { stock: product.stock - item.quantity}
                    })

                    return prisma.orderItem.create({
                        data: {
                            orderId: newOrder.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            total_price: item.total_price
                        }
                    })
                })
            );

            return {
                ...newOrder,
                orderItems: updatedOrderItems
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

    async viewOrderDetail(orderId: number){
        const order = await this.prismaService.orders.findFirst({
            where: { 
                id: orderId,
                kasirId: this.req.user.id},
            include: {
                orderItem: {
                    include: {
                        products: true
                    }
                },
                users: true
            }
        })

        if(!order){
            throw new NotFoundException(`Order with ID ${orderId} not found.`);
        }

        return {
            status: 'success',
            message: 'Order detail',
            data: order
        }
    }
}
