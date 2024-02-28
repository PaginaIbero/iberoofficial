'use client'
import { trpc } from "@/app/_trpc/client";


export default function Page({params}: {params: {año: number}}) {
    const { data, isLoading } = trpc.resultados.getByFecha.useQuery(2023); 
    return (
        <>
        {isLoading ? <p className="text-black">Loading...</p> : data?.map((result) => (
            <div className="text-black" key={result.id}>
                <h1>{result.puntaje}</h1>
                <p>{result.ranking}</p>
            </div>
        ))}
        </>
    )
}