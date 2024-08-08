-- AlterTable
ALTER TABLE "Cronologia" ALTER COLUMN "ciudad" SET DEFAULT '-',
ALTER COLUMN "pais" SET DEFAULT '-',
ALTER COLUMN "fecha" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Paises" ALTER COLUMN "nombre" SET DEFAULT '-',
ALTER COLUMN "contacto" SET DEFAULT '-',
ALTER COLUMN "sitio" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Participaciones" ALTER COLUMN "nombreLider" SET DEFAULT '-',
ALTER COLUMN "nombreTutor" SET DEFAULT '-',
ALTER COLUMN "paisId" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Resultados" ALTER COLUMN "nombreCompleto" SET DEFAULT '-',
ALTER COLUMN "pais" SET DEFAULT '-';
