import { getBaseUrl } from "@/lib/baseUrl";
import { cronologia } from "@/lib/types";

export async function Cronologia() {
      const response = await fetch(`${getBaseUrl()}/api/cronologia`, {next: { revalidate: 3600 } });
      const cronologia = await response.json()
    
    return (
    <>
        {cronologia.map((cronologia: cronologia) => (
            <div key={cronologia.id} className="text-black">
            <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
            <p className='text-center'>{cronologia.ciudad}</p>
            </div>
        ))}
    </>
  )
}