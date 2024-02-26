import { getBaseUrl } from "@/lib/baseUrl";
import { cronologia } from "@/lib/types";

export async function Cronologia() {   
  // let cronologia: cronologia[] = []
  // try {
      const cronologia: cronologia[] = await fetch(`${getBaseUrl()}/api/cronologia`, {next: { revalidate: 3600 } }).then((res) => res.json()).catch((error) => console.error(error));
  // } catch (error) {
  //     console.error(error)
  // }
    
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