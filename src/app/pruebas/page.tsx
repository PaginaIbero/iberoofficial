import CardGrid from "../ui/pruebas/cardgrid"

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center pb-5'>
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