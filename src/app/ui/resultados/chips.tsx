'use client';

import Link from "next/link";

export default function Chips({ id }: {
  id: number
}) {
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
      <Chip text='Estadísticas' id={id} href='estadisticas' active={true}/>
      <Chip text='Individuales' id={id} href='individuales' active={false}/>
      <Chip text='Por país' id={id} href='por-pais' active={false}/>
    </div>
  )
}

export function Chip({ text, id, href, active } : {
  text: string,
  id: number,
  href: string
  active: boolean
}) {
  return (
    <Link 
      className={`
        ${active ? 'bg-blue-200' : 'bg-blue-50 hover:bg-blue-100'}
        text-black font-semibold rounded-full py-1 px-3
      `}
      href={`/resultados/${id}/${href}`}
    >
      {text}
    </Link>
  )
}