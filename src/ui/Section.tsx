'use client'
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"


export function Section({ title, children }: {
    title: string,
    children: React.ReactNode
  }) {
    const [open, setOpen] = useState(false)
    return (
      <div className='flex flex-col border my-2'>
        <div
          className='flex justify-between p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors'
          onClick={() => setOpen(!open)}
        >
          <h2 className='font-semibold'>
            {title}
          </h2>
          <ChevronDownIcon
            className={`w-6 transition-transform duration-300 transform ${open ? 'rotate-0' : '-rotate-90'}`} />
        </div>
        <div className={`px-4 bg-white transition-[max-height] transition-max-height duration-[2s] overflow-hidden ${open ? 'max-h-auto' : 'max-h-0'}`}>
          {children}
        </div>
      </div>
    )
  }