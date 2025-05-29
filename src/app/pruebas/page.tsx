'use client';

import PapersGrid from '@/app/ui/pruebas/PapersGrid';
import { trpc } from '../_trpc/client';

export default function Page() {
  const { data, isLoading } = trpc.papers.getAvailablePapers.useQuery();

  console.log(isLoading);
  console.log(data);

  return (
    <div className='flex flex-col text-black'>
      <h1 className='text-4xl font-semibold text-center'>
        Pruebas
      </h1>
      <p className='text-center'>
        Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
      </p>
      <br/>
      {!isLoading && <PapersGrid papers={data || []} />}
    </div>
  )
}