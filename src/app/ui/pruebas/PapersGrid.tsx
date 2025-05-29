import { Cronologia } from "@prisma/client"
import clsx from "clsx"
import Link from "next/link"

export type PapersProps = {
  id: number,
  ciudad: string,
  pais: string,
  available: boolean[]
}

export default function PapersGrid({ papers }: { papers: PapersProps[] }) {
  console.log(papers)
  return (
    <div className='grid grid-cols-6 gap-2'>
      {papers?.map((paper, i) => (
        <>
          <span className='col-span-2'>
            {paper.id} - {paper.ciudad}, {paper.pais}
          </span>
          {['sp', 'pt', 'en', 'sl'].map((lang, j) => (
            <div key={j}>
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
        </>
      ))}
    </div>
  )
}