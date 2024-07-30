/*
  Warnings:

  - Added the required column `created_at` to the `TypedSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypedSet" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
