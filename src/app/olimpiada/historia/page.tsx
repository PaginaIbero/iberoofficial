'use client'
import { trpc } from "@/app/_trpc/client"

export default function Page() {
  // const { data } = trpc.resultados.excelToBD.useQuery(2023)
  // console.log(data)
  return (
    <main className="flex min-h-screen flex-col text-black">
      <header className='pb-8'>
        <h1 className='text-4xl font-semibold font-sans text-center text-blue-500 pb-5'>Historia</h1>
        <p className='text-center text-gray-700 px-4'>
          Historia de la Olimpiada Iberoamericana de Matemática
        </p>
      </header>
    </main>
  )
}