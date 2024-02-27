import { getBaseUrl } from "@/lib/baseUrl"
import Card from "../ui/card"
import { cronologia } from "@/lib/types"

export default async function Page() {
  const cronologia = await fetch(`${getBaseUrl()}/api/cronologia`).then(res => res.json())
  return (
    <div className="flex flex-col">
      <h1 className='text-4xl font-semibold text-center'>
        Pruebas
      </h1>
      <p className='text-center'>
        Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
      </p>
      <br/>
      <div className='grid grid-cols-4 gap-4'>
        {cronologia.map((item: cronologia) => (
          <Card 
            key={item.id} 
            title={item.id.toString()} 
            subtitle={item.ciudad + ', ' + item.pais}
          />
        ))}
      </div>
    </div>
  )
}