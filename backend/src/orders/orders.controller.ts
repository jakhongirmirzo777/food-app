import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { GetOrderDto } from './dto/get-orders.dto';
import { DailyCounterService } from './daily-counter.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly dailyCounterService: DailyCounterService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  findAll(@Query() query: GetOrderDto) {
    return this.ordersService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch('update-status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(+id, updateOrderDto);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Post('reset-counter')
  resetCounter() {
    return this.dailyCounterService.reset();
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get('statistics')
  async getOrderStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any> {
    return this.ordersService.getOrderStatistics(startDate, endDate);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
