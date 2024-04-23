-- CreateEnum
CREATE TYPE "OrderPaymentType" AS ENUM ('CASH', 'CARD');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentType" "OrderPaymentType";
