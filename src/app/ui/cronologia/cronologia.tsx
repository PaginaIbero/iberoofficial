import { getBaseUrl } from "@/lib/baseUrl";
import { cronologia } from "@/lib/types";
import Link from "next/link";

export async function Cronologia() {
  const cronologia = await fetch(`${getBaseUrl()}/api/cronologia`).then(res => res.json())
  return (
    <div>
      {cronologia ? 
        cronologia.map((cronologia: cronologia) => (
          <div 
            key={cronologia.id}
            className='my-4'
          >
            <Link 
              href={`/resultados/${cronologia.id}`}
              className='text-black hover:text-blue-900 transition-colors cursor-pointer'
            >
              <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
              <p className='text-center'>{cronologia.ciudad}</p>
            </Link>
          </div>
        )) : 
        <p>Loading...</p>}
    </div>
  )
}