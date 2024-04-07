import { PrismaClient } from "@prisma/client";

export type cronologia = {
  id: number;
  ciudad: string;
  pais: string;
  fecha: string;
  paises: number;
  concursantes: number;
  hombres: number;
  mujeres: number;
  cortes: number[];
  premios: number[];
}

export type resultado = {
  id: string;
  fecha: number;
  nombreCompleto: string;
  ranking: number;
  pais: string;
  num: number;
  prob1: number;
  prob2: number;
  prob3: number;
  prob4: number;
  prob5: number;
  prob6: number;
  total: number;
  premio: string;
}

export type participacion = {
  id: string;
  paisId: string;
  equipo: string;
  prob1: number;
  prob2: number;
  prob3: number;
  prob4: number;
  prob5: number;
  prob6: number;
  total: number;
  premio: string;
}

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}