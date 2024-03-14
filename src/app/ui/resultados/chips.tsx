'use client';

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Chips({ chips }: {
  chips: {
    text: string,
    href: string
  }[]
}) {
  return (
    <div className='flex gap-2 mt-4 w-auto overflow-x-scroll md:overflow-hidden'>
      {chips.map(chip => (
        <Suspense key={chip.href} fallback='Loading...'>
          <Chip text={chip.text} href={chip.href}/>
        </Suspense>
      ))}
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
        w-auto py-1 px-3 mb-5 text-black font-semibold rounded-full text-nowrap
        ${searchParams.get('section') === href ? 'bg-blue-200' : 'bg-blue-50 md:hover:bg-blue-100 md:cursor-pointer'}
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