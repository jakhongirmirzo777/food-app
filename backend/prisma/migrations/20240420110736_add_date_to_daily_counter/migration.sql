/*
  Warnings:

  - Added the required column `date` to the `OrdersDailyCounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdersDailyCounter" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "value" SET DEFAULT 1;
