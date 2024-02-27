import { cronologia } from "@/lib/types";
import { ClientTable } from "@/app/ui/cronologia/clientTable";

export default async function Table() {
  const data = await fetch('http://localhost:3000/api/cronologia').then((res) => res.json());
  return (
    <table className='text-center'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Concursantes</th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Cortes</th>
          <th colSpan={4} className='p-1 border-l-2 border-white'>Premios</th>
        </tr>
        <tr className='bg-blue-200'>
          <th className='p-1'>Año</th>
          <th className='p-1'>Ciudad</th>
          <th className='p-1'>País</th>
          <th className='p-1'>Fecha</th>
          <th className='p-1'>Países</th>
          <th className='p-1 border-l-2 border-white'>T</th>
          <th className='p-1'>H</th>
          <th className='p-1 border-r-2 border-white'>M</th>
          <th className='p-1 border-l-2 border-white'>O</th>
          <th className='p-1'>P</th>
          <th className='p-1 border-r-2 border-white'>B</th>
          <th className='p-1 border-l-2 border-white'>O</th>
          <th className='p-1'>P</th>
          <th className='p-1'>B</th>
          <th className='p-1'>MH</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: cronologia, index: number) => {
          return (
            <ClientTable key={index} item={item} index={index}/>
          )
        })}
      </tbody>
    </table>
  );
}