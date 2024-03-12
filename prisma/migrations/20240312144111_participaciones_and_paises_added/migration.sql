/*
  Warnings:

  - You are about to drop the column `puntaje` on the `Resultados` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resultados" DROP COLUMN "puntaje",
ADD COLUMN     "P1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "P2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "P3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "P4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "P5" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "P6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "participacionId" TEXT NOT NULL DEFAULT '-',
ALTER COLUMN "nombreCompleto" SET DEFAULT 'n/a',
ALTER COLUMN "date" SET DEFAULT 0,
ALTER COLUMN "ranking" SET DEFAULT 0,
ALTER COLUMN "medalla" SET DEFAULT 'NADA',
ALTER COLUMN "pais" SET DEFAULT 'n/a',
ALTER COLUMN "numeracion" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Participaciones" (
    "id" TEXT NOT NULL,
    "nombrePais" TEXT NOT NULL DEFAULT 'n/a',
    "date" INTEGER NOT NULL DEFAULT 0,
    "nombreLider" TEXT NOT NULL DEFAULT 'n/a',
    "nombreTutor" TEXT NOT NULL DEFAULT 'n/a',
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "Participaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paises" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT 'n/a',
    "contacto" TEXT NOT NULL DEFAULT 'n/a',
    "sitio" TEXT NOT NULL DEFAULT 'n/a',

    CONSTRAINT "Paises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resultados" ADD CONSTRAINT "Resultados_participacionId_fkey" FOREIGN KEY ("participacionId") REFERENCES "Participaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
