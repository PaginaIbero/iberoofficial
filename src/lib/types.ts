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

export type resultado = {
  id: string;
  nombreCompleto: string;
  date: number;
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  P6: number;
  ranking: number;
  medalla: string;
  pais: string;
  numeracion: number;
}

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}