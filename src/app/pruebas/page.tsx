import CardGrid from "../ui/cardgrid"

export default function Page() {
  // const cronologia = await fetch(`${getBaseUrl()}/api/cronologia`).then(res => res.json())
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Pruebas
      </h1>
      <p className='text-center'>
        Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
      </p>
      <br/>
      <CardGrid />
    </div>
  )
}