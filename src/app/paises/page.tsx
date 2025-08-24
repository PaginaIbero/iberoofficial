import CountriesCardGrid from "@/ui/paises/CountriesCardGrid";

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <header className='pb-8'>
        <h1 className='text-4xl font-semibold font-sans text-center text-blue-500 pb-5'>
          Países
        </h1>
        <p className='text-center text-gray-700 px-4'>
          Lista de países participantes de la Olimpiada Iberoamericana de Matemática
        </p>
      </header>
      <CountriesCardGrid />
    </div>
  )
}