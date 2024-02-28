import Link from "next/link"
import Image from "next/image"

export default async function Card({ title, subtitle }: {
  title: string,
  subtitle: string
}) {
  const exists = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_URL}/pruebas/${title}.pdf`)
    .then(res => res.status === 200)
  }
  return (
    <div className='flex flex-col bg-white rounded-md'>
      <div className='relative w-full h-36'>
        <Image
          src={`/images/${title}.jpg`}
          alt={title}
          width={200}
          height={48}
          className='rounded-md w-full h-full'
        />
        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-black'/>
        <div className='absolute bottom-0 text-white p-2'>
          <h2 className='text-2xl font-semibold'>
            {title}
          </h2>
          <p className='text-xl'>
            {subtitle}
          </p>
        </div>
      </div>
      <div className='flex w-full pt-2'>
        <Link
          href={await exists() ? `/pruebas/${title}.pdf` : '#'}
          className={`
            ${await exists() ? 'bg-blue-600 hover:bg-blue-900 cursor-pointer transition-colors' : 'bg-blue-300 cursor-default'}
            w-full p-2 rounded-md
            font-semibold text-white text-center
          `}
        >
          Ver prueba    
        </Link>
      </div>
    </div>
  )
}