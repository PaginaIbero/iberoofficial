'use client';

import { router } from "@/server/trpc";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Chips({ id }: {
  id: number
}) {
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
      <Chip text='Estadísticas' href='estadisticas'/>
      <Chip text='Individuales' href='individuales'/>
      <Chip text='Por país' href='por-pais'/>
    </div>
  )
}

export function Chip({ text, href } : {
  text: string,
  href: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = new URLSearchParams(useSearchParams())
  return (
    <div 
      className={`
        ${searchParams.get('section') === href ? 'bg-blue-200' : 'bg-blue-50 hover:bg-blue-100 cursor-pointer'}
        text-black font-semibold rounded-full py-1 px-3 mb-5
      `}
      onClick={() => {
        searchParams.set('section', href)
        router.push(`${pathname}?${searchParams.toString()}`)
      }}
    >
      {text}
    </div>
  )
}