import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { DailyCounterService } from './daily-counter.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [OrdersController],
  providers: [OrdersService, DailyCounterService],
})
export class OrdersModule {}
