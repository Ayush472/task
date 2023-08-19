-- CreateTable
CREATE TABLE "Transaction" (
    "customer_id" SERIAL NOT NULL,
    "product_purchased" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sales" DECIMAL(10,2) NOT NULL,
    "month_year" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("customer_id")
);
