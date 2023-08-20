/*
  Warnings:

  - A unique constraint covering the columns `[customer_name]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "customer_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_customer_name_key" ON "Transaction"("customer_name");
