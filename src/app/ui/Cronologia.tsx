'use client'
import { Cronologia } from "@/lib/types";
import { PrismaClient } from "@prisma/client/extension";
import axios from "axios";
import { useEffect, useState } from "react";

export function Cronologia() {
    const [cronologia, setCronologia] = useState<Cronologia[]>([]);
    
    useEffect(() => {
      getCronologia();
    }, []);

    const getCronologia = async () => {
      const response = await axios.get('/api/cronologia');
      setCronologia(response.data);
    }

    return (
    <>
        {cronologia.map((cronologia: Cronologia) => (
            <div key={cronologia.id} className="text-black">
            <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
            <p className='text-center'>{cronologia.ciudad}</p>
            </div>
        ))}
    </>
  )
}