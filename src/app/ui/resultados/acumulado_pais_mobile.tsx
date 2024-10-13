import { trpc } from "@/app/_trpc/client"
import { MobileTableSkeleton } from "@/app/ui/skeletons"

export function AcumuladoPaisMobileTable() {
  const { data, isLoading } = trpc.participaciones.getAcumuladoPais.useQuery()
  return (
    <div>
      {isLoading ? <MobileTableSkeleton/> :
        data?.map((item, i) => (
          <div 
            key={item.codigo}
            className='my-4 text-black'
          >
            <h1 className='text-lg'>
              <span className='font-bold'>
                {item.pais}
              </span>
            </h1>
            <p>
              # Part.: {item.participaciones} 
            </p>
            <p>
              # Concurs.: {item.concursantes}
            </p>
            <p>
              Medallas: {item.premios[0]} 🥇 | {item.premios[1]} 🥈 | {item.premios[2]} 🥉 | {item.premios[3]} MH
            </p>
            <p>
              Copas PR: {item.copas_pr} 🏆
            </p>
            {i < data.length - 1 && <hr className='my-4'/>}
          </div>
        ))
      }
    </div>
  )
}
