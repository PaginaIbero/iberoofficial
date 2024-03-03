import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/lib/db'



export async function GET(req: NextRequest, res: NextResponse) {
    const { anio } = await req.json();
    const resultados_anio = await prismadb.resultados.findMany({
        where: {
            date: anio
        },
        orderBy: {
            ranking: 'desc'
        },
    });
    return NextResponse.json(resultados_anio, { status: 200 })
}