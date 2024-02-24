'use client'
import { Cronologia } from "@/lib/types";
import axios from "axios";
import { useState } from "react";

export function Cronologia() {
    const [cronologia, setCronologia] = useState<Cronologia[]>([]);
    
    const getCronologia = async () => {
    await axios.get('/api/cronologia').then((res) => setCronologia(res.data));
    }
    getCronologia();
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