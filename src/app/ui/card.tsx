import Link from "next/link"

export default function Card({ title, subtitle }: {
  title: string,
  subtitle: string
}) {
  return (
    <div className='flex flex-col bg-white p-4 rounded-md'>
      <h2 className='text-2xl font-semibold'>
        {title}
      </h2>
      <p className='text-xl'>
        {subtitle}
      </p>
      <Link
        href={`/pruebas/${title}.pdf`}
        className='bg-blue-600 hover:bg-blue-900 font-semibold text-white p-2 mt-2 rounded-md text-center transition-colors'
      >
        Ver prueba    
      </Link>
    </div>
  )
}