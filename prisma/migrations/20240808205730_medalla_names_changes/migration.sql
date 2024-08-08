/*
  Warnings:

  - The values [g,s,b,hm,n] on the enum `Medalla` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Medalla_new" AS ENUM ('ORO', 'PLATA', 'BRONCE', 'MENCION', 'NADA');
ALTER TABLE "Resultados" ALTER COLUMN "premio" DROP DEFAULT;
ALTER TABLE "Resultados" ALTER COLUMN "premio" TYPE "Medalla_new" USING ("premio"::text::"Medalla_new");
ALTER TYPE "Medalla" RENAME TO "Medalla_old";
ALTER TYPE "Medalla_new" RENAME TO "Medalla";
DROP TYPE "Medalla_old";
ALTER TABLE "Resultados" ALTER COLUMN "premio" SET DEFAULT 'NADA';
COMMIT;

-- AlterTable
ALTER TABLE "Resultados" ALTER COLUMN "premio" SET DEFAULT 'NADA';
