-- CreateTable
CREATE TABLE "Exercise" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "force" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "mechanic" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "primaryMuscles" TEXT[],
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],
    "category" TEXT NOT NULL,
    "images" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_slug_key" ON "Exercise"("slug");
