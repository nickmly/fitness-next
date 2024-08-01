/*
  Warnings:

  - The `distance` column on the `TypedSet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TypedSet" DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER;
