/*
  Warnings:

  - Added the required column `condition` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "condition" "Condition" NOT NULL;
