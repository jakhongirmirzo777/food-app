import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { format } from 'date-fns';

@Injectable()
export class DailyCounterService {
  constructor(private prisma: PrismaService) {}

  formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  async incrementDailyCounter(date: Date): Promise<number> {
    const formattedDate = this.formatDate(date);

    const existingCounter = await this.prisma.ordersDailyCounter.findFirst({
      where: { date: formattedDate },
    });

    let counterValue = 1;
    if (existingCounter) {
      counterValue = existingCounter.value + 1;
      await this.prisma.ordersDailyCounter.update({
        where: { id: existingCounter.id },
        data: { value: counterValue },
      });
    } else {
      await this.prisma.ordersDailyCounter.create({
        data: { date: formattedDate, value: counterValue },
      });
    }
    return counterValue;
  }

  reset() {
    return this.prisma.ordersDailyCounter.deleteMany();
  }
}
