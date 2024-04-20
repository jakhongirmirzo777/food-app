-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" INTEGER;

-- CreateTable
CREATE TABLE "OrdersDailyCounter" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OrdersDailyCounter_pkey" PRIMARY KEY ("id")
);
