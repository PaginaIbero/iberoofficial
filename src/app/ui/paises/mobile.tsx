import { trpc } from "@/app/_trpc/client";
import { formatPremio } from "@/lib/formatStrings";
import { participacion } from "@/lib/types";
import Table from "../components/Table";

export function PaisIndividualesMobileTable({ id }: {
  id: string
}) {
  const {
    data: dataResultados,
    isLoading: isLoadingResultados
  } = trpc.participaciones.getByPais.useQuery(id)
  return (
    <div>
      {isLoadingResultados ? 'Cargando...' :
        dataResultados?.map((participacion) => (
          <div key={participacion.fecha}>
            <h1 className='text-4xl font-semibold mt-2'>
              {participacion.fecha}
            </h1>
            {participacion.equipo.map((resultado) => (
              <div
                key={resultado.fecha}
                className='my-4 text-black'
              >
                <h2 className='text-xl font-semibold'>
                  {formatPremio(resultado.premio)}
                </h2>
                <h1 className='text-lg'>
                  <span className='font-bold'>
                    (#{resultado.ranking}) {resultado.nombreCompleto}
                  </span> ({resultado.pais}{resultado.num})
                </h1>
                <p>
                  Puntaje: {resultado.prob1} + {resultado.prob2} + {resultado.prob3} + {resultado.prob4} + {resultado.prob5} + {resultado.prob6} = <span className='font-bold'>{resultado.total}</span>
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export function PaisPorEquipoMobileTable({ id }: {
  id: string
}) {
  const {
    data: dataResultados,
    isLoading: isLoadingResultados
  } = trpc.participaciones.getByPais.useQuery(id)
  return (
    <>
      {isLoadingResultados ? 'Cargando...' :
        dataResultados?.map((participacion) => (
          <div key={participacion.fecha}>
            <h1 className='text-xl font-semibold mt-2'>
              {participacion.fecha}
            </h1>
            <p>
              Puntaje: {participacion.prob1} + {participacion.prob2} + {participacion.prob3} + {participacion.prob4} + {participacion.prob5} + {participacion.prob6} = <span className='font-bold'>{participacion.total}</span>
            </p>
            <p>
            Premios: {participacion.premios[0]} 🥇 | {participacion.premios[1]} 🥈 | {participacion.premios[2]} 🥉 | {participacion.premios[3]} MH
            </p>
          </div>
        ))}
    </>
  )
}

