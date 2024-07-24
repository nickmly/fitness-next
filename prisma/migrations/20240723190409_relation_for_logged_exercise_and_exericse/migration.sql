-- AddForeignKey
ALTER TABLE "LoggedExercise" ADD CONSTRAINT "LoggedExercise_exerciseSlug_fkey" FOREIGN KEY ("exerciseSlug") REFERENCES "Exercise"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
