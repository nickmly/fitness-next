-- CreateEnum
CREATE TYPE "SetType" AS ENUM ('WEIGHT_REPS', 'TIME_DISTANCE');

-- CreateTable
CREATE TABLE "LoggedExercise" (
    "id" TEXT NOT NULL,
    "exerciseSlug" TEXT NOT NULL,
    "logId" TEXT
);

-- CreateTable
CREATE TABLE "TypedSet" (
    "id" TEXT NOT NULL,
    "type" "SetType" NOT NULL DEFAULT 'WEIGHT_REPS',
    "setId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WeightRepsSet" (
    "id" TEXT NOT NULL,
    "loggedExerciseId" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TimeDistanceSet" (
    "id" TEXT NOT NULL,
    "loggedExerciseId" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "seconds" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LoggedExercise_id_key" ON "LoggedExercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypedSet_id_key" ON "TypedSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeightRepsSet_id_key" ON "WeightRepsSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeDistanceSet_id_key" ON "TimeDistanceSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- AddForeignKey
ALTER TABLE "LoggedExercise" ADD CONSTRAINT "LoggedExercise_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
