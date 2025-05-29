'use client';

import clsx from "clsx"
import Link from "next/link"

export type PapersProps = {
  id: number,
  ciudad: string,
  pais: string,
  available: boolean[]
}

export default function PapersGrid({ papers }: { papers: PapersProps[] }) {
  return (
    <div className='md:grid md:grid-cols-6 md:gap-2 flex flex-col'>
      {papers?.map((paper, i) => (
        <>
          <span className='md:col-span-2'>
            {paper.id} - {paper.ciudad}, {paper.pais}
          </span>
          <div className='flex flex-row gap-4 md:contents w-full'>
            {['sp', 'pt', 'en', 'sl'].map((lang, j) => (
              <div key={j} className='md:col-span-1'>
                <Link
                  className={clsx({
                    'hover:underline cursor-pointer text-blue-500': paper.available[j],
                    'text-gray-400': !paper.available[j],
                  })}
                  href={`/pruebas/${paper.id}-${lang}.pdf`}
                >
                  {lang === 'sp' ? 'Español' : lang === 'pt' ? 'Portugués' : lang === 'en' ? 'Inglés' : 'Shortlist'}
                </Link>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}