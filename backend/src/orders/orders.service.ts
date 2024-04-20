import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
import { GetOrderDto } from './dto/get-orders.dto';
import { DailyCounterService } from './daily-counter.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dailyCounterService: DailyCounterService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const meals = await this.prisma.meal.findMany({
      where: {
        id: {
          in: createOrderDto.orderItems.map((item) => item.mealId),
        },
      },
    });

    const totalCost = createOrderDto.orderItems.reduce((acc, item) => {
      const meal = meals.find((m) => m.id === item.mealId);
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${item.mealId} not found`);
      }
      return acc + meal.price * item.mealQuantity;
    }, 0);

    const today = new Date();
    const counter = await this.dailyCounterService.incrementDailyCounter(today);

    const order = await this.prisma.order.create({
      data: {
        totalCost,
        userPhoneNumber: createOrderDto.userPhoneNumber,
        address: createOrderDto.address,
        tableNumber: createOrderDto.tableNumber,
        status: OrderStatus.NEW,
        orderNumber: counter,
        orderItems: {
          createMany: {
            data: createOrderDto.orderItems.map((item) => ({
              mealId: item.mealId,
              mealQuantity: item.mealQuantity,
            })),
          },
        },
      },
      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
    });

    return order;
  }

  async update(id: number, updateOrderDto: CreateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const meals = await this.prisma.meal.findMany({
      where: {
        id: {
          in: updateOrderDto.orderItems.map((item) => item.mealId),
        },
      },
    });

    const totalCost = updateOrderDto.orderItems.reduce((acc, item) => {
      const meal = meals.find((m) => m.id === item.mealId);
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${item.mealId} not found`);
      }
      return acc + meal.price * item.mealQuantity;
    }, 0);

    await this.prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        totalCost,
        userPhoneNumber: updateOrderDto.userPhoneNumber || null,
        address: updateOrderDto.address || null,
        tableNumber: updateOrderDto.tableNumber || null,
        orderItems: {
          createMany: {
            data: updateOrderDto.orderItems.map((item) => ({
              mealId: item.mealId,
              mealQuantity: item.mealQuantity,
            })),
          },
        },
      },

      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
    });

    return updatedOrder;
  }

  async findAll(query: GetOrderDto) {
    const { orderByOrderStatus, startDate, endDate } = query;
    const findOrderQuery: {
      include: {
        orderItems: true;
      };
      orderBy: {
        createdAt: 'desc';
      };
      where?: {
        status?: any;
        createdAt?: any;
        isDeleted: boolean;
      };
    } = {
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        isDeleted: false,
      },
    };
    if (startDate && endDate) {
      findOrderQuery.where = {
        isDeleted: false,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    if (orderByOrderStatus) {
      findOrderQuery.where = {
        isDeleted: false,
        status: {
          equals: orderByOrderStatus,
        },
      };
    }

    const orders = await this.prisma.order.findMany(findOrderQuery);

    const ordersWithItemCount = orders.map((order) => {
      const orderItemCount = order.orderItems.reduce(
        (acc, item) => acc + item.mealQuantity,
        0,
      );

      delete order.orderItems;
      delete order.isDeleted;

      return {
        ...order,
        orderItemCount,
      };
    });

    return ordersWithItemCount;
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            meal: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: number, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });

    return updatedOrder;
  }

  async remove(id: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return updatedOrder;
  }
}
