import fs from "fs";
import path from "path";

import { router, publicProcedure } from "../trpc";
import { PapersProps } from "@/ui/pruebas/PapersGrid";
import prisma from '@/lib/db';

export const papersRouter = router({
  getAvailablePapers: publicProcedure.query(async () => {
    const cronology = await prisma.cronologia.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    // Read the pruebas directory once to get all available files
    const pruebasDir = path.join(process.cwd(), 'public', 'pruebas');
    let availableFiles: string[] = [];
    
    try {
      availableFiles = fs.readdirSync(pruebasDir);
    } catch (error) {
      console.warn('Pruebas directory not found or not readable');
    }

    const available: PapersProps[] = [];

    for (const edition of cronology) {
      const editionFiles = ['sp', 'pt', 'en', 'sl'].map((lang) => {
        const fileName = `${edition.id}-${lang}.pdf`;
        return availableFiles.includes(fileName);
      });

      available.push({
        'id': edition.id,
        'ciudad': edition.ciudad,
        'pais': edition.pais,
        'available': editionFiles,
      });
    }

    return available;
  }),
});
