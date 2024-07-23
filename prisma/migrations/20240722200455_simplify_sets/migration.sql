/*
  Warnings:

  - You are about to drop the column `setId` on the `TypedSet` table. All the data in the column will be lost.
  - You are about to drop the `TimeDistanceSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeightRepsSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `distance` to the `TypedSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutes` to the `TypedSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `TypedSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seconds` to the `TypedSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `TypedSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypedSet" DROP COLUMN "setId",
ADD COLUMN     "distance" TEXT NOT NULL,
ADD COLUMN     "loggedExerciseId" TEXT,
ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "seconds" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TimeDistanceSet";

-- DropTable
DROP TABLE "WeightRepsSet";

-- AddForeignKey
ALTER TABLE "TypedSet" ADD CONSTRAINT "TypedSet_loggedExerciseId_fkey" FOREIGN KEY ("loggedExerciseId") REFERENCES "LoggedExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
