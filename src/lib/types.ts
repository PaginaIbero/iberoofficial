import { PrismaClient } from "@prisma/client";

export type cronologia = {
    id: number;
    ciudad: string;
    pais: string;
    fecha: string;
    paises: number;
    participantes: number;
    hombres: number;
    mujeres: number;
    cortes: number[];
    premios: number[];
}

declare global {
    namespace globalThis {
        var prismadb: PrismaClient;
    }
}