import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    const { anio } = await req.json();
    const resultados_anio = await prisma.resultados.findMany({
        where: {
            date: anio
        },
        orderBy: {
            ranking: 'desc'
        },
    });
    return NextResponse.json(resultados_anio, { status: 200 })
}