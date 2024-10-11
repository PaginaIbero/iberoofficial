-- AlterTable
ALTER TABLE "Cronologia" ADD COLUMN     "copa_prId" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "max_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" TEXT NOT NULL DEFAULT '-';

-- AddForeignKey
ALTER TABLE "Cronologia" ADD CONSTRAINT "Cronologia_copa_prId_fkey" FOREIGN KEY ("copa_prId") REFERENCES "Paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
