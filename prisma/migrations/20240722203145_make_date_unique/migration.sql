/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Log` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Log_date_key" ON "Log"("date");
