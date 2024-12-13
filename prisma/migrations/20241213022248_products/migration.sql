-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'DRINK', 'SNACK');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "category" "Category" NOT NULL DEFAULT 'FOOD',
    "image" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
