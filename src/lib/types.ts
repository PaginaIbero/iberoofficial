import { PrismaClient } from "@prisma/client";

export type cronologia = {
    id: number;
    ciudad: string;
    pais: string;
    participantes: number;
    cortes: number[];
}

declare global {
    namespace globalThis {
        var prismadb: PrismaClient;
    }
}