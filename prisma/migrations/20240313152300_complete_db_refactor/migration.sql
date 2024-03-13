/*
  Warnings:

  - The values [ORO,PLATA,BRONCE,MENCION,NADA] on the enum `Medalla` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `participantes` on the `Cronologia` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Participaciones` table. All the data in the column will be lost.
  - You are about to drop the column `nombrePais` on the `Participaciones` table. All the data in the column will be lost.
  - You are about to drop the column `P1` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `P2` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `P3` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `P4` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `P5` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `P6` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `medalla` on the `Resultados` table. All the data in the column will be lost.
  - You are about to drop the column `numeracion` on the `Resultados` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Medalla_new" AS ENUM ('g', 's', 'b', 'hm', 'n');
ALTER TABLE "Resultados" ALTER COLUMN "medalla" DROP DEFAULT;
ALTER TABLE "Resultados" ALTER COLUMN "medalla" TYPE "Medalla_new" USING ("medalla"::text::"Medalla_new");
ALTER TYPE "Medalla" RENAME TO "Medalla_old";
ALTER TYPE "Medalla_new" RENAME TO "Medalla";
DROP TYPE "Medalla_old";
COMMIT;

-- AlterTable
ALTER TABLE "Cronologia" DROP COLUMN "participantes",
ADD COLUMN     "concursantes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Participaciones" DROP COLUMN "date",
DROP COLUMN "nombrePais",
ADD COLUMN     "fecha" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paisId" TEXT NOT NULL DEFAULT 'n/a',
ADD COLUMN     "premios" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0]::INTEGER[],
ADD COLUMN     "prob1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob5" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Resultados" DROP COLUMN "P1",
DROP COLUMN "P2",
DROP COLUMN "P3",
DROP COLUMN "P4",
DROP COLUMN "P5",
DROP COLUMN "P6",
DROP COLUMN "date",
DROP COLUMN "medalla",
DROP COLUMN "numeracion",
ADD COLUMN     "fecha" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "num" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "premio" "Medalla" NOT NULL DEFAULT 'n',
ADD COLUMN     "prob1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob5" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prob6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Participaciones" ADD CONSTRAINT "Participaciones_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
