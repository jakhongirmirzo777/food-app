import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';
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
        paymentType: createOrderDto.paymentType,
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
        paymentType: updateOrderDto.paymentType || null,
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
    const { orderByOrderStatus, startDate, endDate, search } = query;
    const findOrderQuery: {
      include: {
        orderItems: true;
      };
      orderBy: {
        createdAt: 'desc';
      };
      where: Prisma.OrderWhereInput;
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

    if (search) {
      findOrderQuery.where = {
        ...findOrderQuery.where,
        OR: [
          {
            userPhoneNumber: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            address: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
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

  async getOrderStatistics(start: string, end: string): Promise<any> {
    const startDate = new Date(start);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setUTCHours(0, 0, 0, 0);
    endDate.setDate(endDate.getDate() + 1);

    const orders = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        createdAt: true,
        totalCost: true,
        status: true,
        isDeleted: true,
      },
    });

    const stats = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0]; // Extract date without time
      if (!stats[date]) {
        stats[date] = {
          totalOrders: 0,
          totalPrice: 0,
          totalNewOrders: 0,
          totalNewOrdersPrice: 0,
          totalPendingOrders: 0,
          totalPendingOrdersPrice: 0,
          totalRejectedOrders: 0,
          totalRejectedOrdersPrice: 0,
          totalCompletedOrders: 0,
          totalCompletedOrdersPrice: 0,
          totalDeletedOrders: 0,
          totalDeletedOrdersPrice: 0,
        };
      }
      stats[date].totalOrders++;
      stats[date].totalPrice += order.totalCost;

      if (order.isDeleted) {
        stats[date].totalDeletedOrders++;
        stats[date].totalDeletedOrdersPrice += order.totalCost;
        return;
      }

      switch (order.status) {
        case OrderStatus.NEW:
          stats[date].totalNewOrders++;
          stats[date].totalNewOrdersPrice += order.totalCost;
          break;
        case OrderStatus.PENDING:
          stats[date].totalPendingOrders++;
          stats[date].totalPendingOrdersPrice += order.totalCost;
          break;
        case OrderStatus.REJECTED:
          stats[date].totalRejectedOrders++;
          stats[date].totalRejectedOrdersPrice += order.totalCost;
          break;
        case OrderStatus.COMPLETED:
          stats[date].totalCompletedOrders++;
          stats[date].totalCompletedOrdersPrice += order.totalCost;
          break;
        default:
          break;
      }
    });

    return stats;
  }
}
