-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "transaction_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_price" INTEGER NOT NULL,
    "total_item" INTEGER NOT NULL,
    "kasirId" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_kasirId_fkey" FOREIGN KEY ("kasirId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
