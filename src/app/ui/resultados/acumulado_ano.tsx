import { trpc } from "@/app/_trpc/client";
import { TableBodySkeleton } from "../skeletons";
import { cronologia } from "@/lib/types";
import { useRouter } from "next/navigation";

export function AcumuladoAnoTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <table className='text-center text-black table-fixed'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Concursantes</th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Cortes</th>
          <th colSpan={4} className='p-1 border-l-2 border-white'>Premios</th>
          <th className='p-1 border-l-2 border-white'></th>
        </tr>
        <tr className='bg-blue-200'>
          <th className='w-[10%] p-1'>Año</th>
          <th className='w-[10%] p-1'>País</th>
          <th className='w-[10%] p-1'>Países</th>
          <th className='w-[5%] p-1 border-l-2 border-white'>T</th>
          <th className='w-[5%] p-1'>H</th>
          <th className='w-[5%] p-1 border-r-2 border-white'>M</th>
          <th className='w-[3%] p-1 border-l-2 border-white'>O</th>
          <th className='w-[3%] p-1'>P</th>
          <th className='w-[3%] p-1 border-r-2 border-white'>B</th>
          <th className='w-[3%] p-1 border-l-2 border-white'>O</th>
          <th className='w-[3%] p-1'>P</th>
          <th className='w-[3%] p-1'>B</th>
          <th className='w-[3%] p-1 border-r-2 border-white'>MH</th>
          <th className='w-[15%] p-1 border-l-2 border-white'>Copa Puerto Rico</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <AcumuladoAnoTableBody content={data || []}/>}
      </tbody>
    </table>
  );
}

function AcumuladoAnoTableBody({ content }: {
  content: cronologia[]
}) {
  const router = useRouter();
  return (
    <>
      {content?.map((item: cronologia, index: number) => (
        <tr
          key={item.id}
          className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} transition-colors cursor-pointer`}
          onClick={() => { 
            router.push(`/resultados/${item.id}?section=estadisticas`) 
          }}
        >
          <td className='py-3'>{item.id}</td>
          <td className='py-3'>{item.pais}</td>
          <td className='py-3'>{item.paises}</td>
          <td className='py-3 border-l-2 border-white'>{item.concursantes}</td>
          <td className='py-3'>{item.hombres}</td>
          <td className='py-3'>{item.mujeres}</td>
          <td className='py-3 border-l-2 border-white'>{item.cortes ? item.cortes[0] : 'n/a'}</td>
          <td className='py-3'>{item.cortes ? item.cortes[1] : 'n/a'}</td>
          <td className='py-3'>{item.cortes ? item.cortes[2] : 'n/a'}</td>
          <td className='py-3 border-l-2 border-white'>{item.premios ? item.premios[0] : 'n/a'}</td>
          <td className='py-3'>{item.premios ? item.premios[1] : 'n/a'}</td>
          <td className='py-3'>{item.premios ? item.premios[2] : 'n/a'}</td>
          <td className='py-3'>{item.premios ? item.premios[3] : 'n/a'}</td>
          <td className='py-3 border-l-2 border-white hidden lg:table-cell'>{item.copa_pr?.nombre}</td>
        </tr>
      ))}
    </>
  )
}