'use client';

import PapersGrid from '@/app/ui/pruebas/PapersGrid';
import { trpc } from '../_trpc/client';

export default function Page() {
  const { data, isLoading } = trpc.papers.getAvailablePapers.useQuery();

  return (
    <div className='flex flex-col text-black'>
      <header className='pb-8'>
        <h1 className='text-4xl font-semibold font-sans text-center text-blue-500 pb-5'>
          Pruebas
        </h1>
        <p className='text-center text-gray-700 px-4'>
          Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
        </p>
      </header>
      <br/>
      {!isLoading && <PapersGrid papers={data || []} />}
    </div>
  )
}