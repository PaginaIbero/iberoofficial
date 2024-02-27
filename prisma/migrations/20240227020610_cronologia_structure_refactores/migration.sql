-- CreateEnum
CREATE TYPE "Medalla" AS ENUM ('ORO', 'PLATA', 'BRONCE', 'MENCION', 'NADA');

-- CreateTable
CREATE TABLE "Cronologia" (
    "id" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL DEFAULT 'n/a',
    "pais" TEXT NOT NULL DEFAULT 'n/a',
    "fecha" TEXT NOT NULL DEFAULT 'n/a',
    "paises" INTEGER NOT NULL DEFAULT 0,
    "participantes" INTEGER NOT NULL DEFAULT 0,
    "hombres" INTEGER NOT NULL DEFAULT 0,
    "mujeres" INTEGER NOT NULL DEFAULT 0,
    "cortes" INTEGER[] DEFAULT ARRAY[0, 0, 0]::INTEGER[],
    "premios" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0]::INTEGER[],

    CONSTRAINT "Cronologia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resultados" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "puntaje" INTEGER[],
    "ranking" INTEGER NOT NULL,
    "medalla" "Medalla" NOT NULL,
    "pais" TEXT NOT NULL,
    "numeracion" INTEGER NOT NULL,

    CONSTRAINT "Resultados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cronologia_id_key" ON "Cronologia"("id");
