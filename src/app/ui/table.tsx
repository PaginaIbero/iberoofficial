'use client';

import { useRouter } from "next/navigation";
import { TableBodySkeleton } from "@/app/ui/skeletons";

export default function Table({ headers, data, href, isLoading }: {
  headers: string[],
  data: string[][],
  href?: string[],
  isLoading: boolean
}) {
  return (
    <table className='text-center text-black table-auto w-full'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          {headers.map((header, index) => (
            <th key={index} className='p-1'>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <TableBody content={data} href={href}/>}
      </tbody>
    </table>
  );
}

function TableBody({ content, href }: {
  content: string[][],
  href?: string[]
}) {
  const router = useRouter();
  return (
    <>
      {content?.map((item: string[], index: number) => (
        <tr
          key={index}
          className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} 
                      transition-colors cursor-pointer`}
          onClick={href ? () => router.push(href[index]) : undefined}
        >
          {item.map((cell, index) => (
            <td key={index} className='py-3'>{cell}</td>
          ))}
        </tr>
      ))}
    </>
  )
}