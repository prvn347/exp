/*
  Warnings:

  - Changed the type of `genre` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genre",
ADD COLUMN     "genre" "Genre" NOT NULL;
