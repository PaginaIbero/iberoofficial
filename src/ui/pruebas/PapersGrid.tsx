'use client';

import clsx from "clsx"
import Link from "next/link"

export type PapersProps = {
  id: number,
  ciudad: string,
  pais: string,
  available: boolean[]
}

const languages = {
  sp: { 'text': 'Español', 'color': 'blue' },
  pt: { 'text': 'Portugués', 'color': 'green' },
  en: { 'text': 'Inglés', 'color': 'purple' },
  sl: { 'text': 'Shortlist', 'color': 'orange' },
}

// Helper function to get language-specific classes
const getLanguageClasses = (lang: string, isAvailable: boolean) => {
  if (!isAvailable) return 'text-gray-400'
  
  const colorMap = {
    sp: 'bg-blue-100 text-blue-800',
    pt: 'bg-green-100 text-green-800', 
    en: 'bg-purple-100 text-purple-800',
    sl: 'bg-orange-100 text-orange-800'
  }
  
  return `${colorMap[lang as keyof typeof colorMap]} hover:underline cursor-pointer`
}

export default function PapersGrid({ papers }: { papers: PapersProps[] }) {
  return (
    <div className='md:grid md:grid-cols-6 md:gap-2 flex flex-col'>
      {papers?.map((paper, i) => (
        <>
          <span key={i} className='md:col-span-2'>
            {paper.id} - {paper.ciudad !== '-' && paper.pais !== '-' ? `${paper.ciudad}, ${paper.pais}` : paper.pais !== '-' ? paper.pais : 'N/A'}
          </span>
          <div key={i} className='flex flex-row flex-wrap md:contents w-full'>
            {Object.keys(languages).map((lang, j) => (
              <div key={j} className='md:col-span-1'>
                <Link
                  className={clsx(
                    getLanguageClasses(lang, paper.available[j]),
                    'px-2 py-1 rounded-full'
                  )}
                  href={`/pruebas/${paper.id}-${lang}.pdf`}
                >
                  {languages[lang as keyof typeof languages].text}
                </Link>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}