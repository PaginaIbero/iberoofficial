import fs from "fs";
import path from "path";

import { router, publicProcedure } from "../trpc";
import { PapersProps } from "@/app/ui/pruebas/PapersGrid";
import prisma from '@/lib/db';

export const papersRouter = router({
  getAvailablePapers: publicProcedure.query(async () => {
    const cronology = await prisma.cronologia.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    const available: PapersProps[] = [];

    for (const edition of cronology) {
      available.push({
        'id': edition.id,
        'ciudad': edition.ciudad,
        'pais': edition.pais,
        'available': await Promise.all(['sp', 'pt', 'en', 'sl'].map(async (lang) => {
          const fileName = `${edition.id}-${lang}.pdf`;
          const filePath = path.join(process.cwd(), 'public', 'pruebas', fileName);
          return fs.existsSync(filePath);
        })),
      });
    }

    return available;
  }),
});
