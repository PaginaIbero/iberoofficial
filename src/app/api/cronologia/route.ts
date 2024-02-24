import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    const cronologia = await prisma.cronologia.findMany({
        orderBy: {
            id: 'desc'
        }
    
    })
    return NextResponse.json(cronologia, { status: 200 })
}