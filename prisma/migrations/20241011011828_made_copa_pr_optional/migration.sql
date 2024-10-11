-- DropForeignKey
ALTER TABLE "Cronologia" DROP CONSTRAINT "Cronologia_copa_prId_fkey";

-- AlterTable
ALTER TABLE "Cronologia" ALTER COLUMN "copa_prId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cronologia" ADD CONSTRAINT "Cronologia_copa_prId_fkey" FOREIGN KEY ("copa_prId") REFERENCES "Paises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
