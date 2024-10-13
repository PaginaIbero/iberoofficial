import { trpc } from "@/app/_trpc/client"
import { CronologiaMobileTableSkeleton } from "../skeletons"
import Link from "next/link"
import { cronologia } from "@/lib/types"

export function AcumuladoAnoMobileTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <div className='flex flex-col items-center'>
      {isLoading ? <CronologiaMobileTableSkeleton/> :
        data?.map((cronologia: cronologia) => (
          <div 
            key={cronologia.id}
            className='my-1 rounded-md w-fit hover:bg-blue-100 transition duration-300 ease-in-out cursor-pointer'
          >
            <Link 
              href={`/resultados/${cronologia.id}?section=estadisticas`}
              className='py-3 px-8 text-black hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer'
            >
              <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
              <p className='text-center'>
                <span className='font-bold'>{cronologia.ciudad}</span>, {cronologia.pais}
              </p>
              <p className='text-center'>{cronologia.fecha}</p>
              <p className='text-center'>Cortes: {cronologia.cortes[0]} | {cronologia.cortes[1]} | {cronologia.cortes[2]}</p>
              <p className='text-center'>{cronologia.premios[0]} 🥇 | {cronologia.premios[1]} 🥈 | {cronologia.premios[2]} 🥉 | {cronologia.premios[3]} MH</p>
              <p className='text-center'>Copa PR: <span className='font-bold'>{cronologia.copa_pr?.nombre || '-'}</span>
              </p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}