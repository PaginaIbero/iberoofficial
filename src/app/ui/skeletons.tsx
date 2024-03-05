export function TableBodySkeleton() {
  return (
    <>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded'/>
      </tr>
    </>
  )
}

export function TitleSkeleton() {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-blue-50 w-72 h-10 motion-safe:animate-pulse rounded mb-1'/>
      <div className='bg-blue-100 w-36 h-9 motion-safe:animate-pulse rounded'/>
    </div>
  )
}

export function InformacionGeneralSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='bg-blue-50 w-72 h-5 motion-safe:animate-pulse rounded mb-1'/>
      <div className='bg-blue-100 w-48 h-5 motion-safe:animate-pulse rounded mb-1'/>
      <div className='bg-blue-50 w-36 h-5 motion-safe:animate-pulse rounded mb-1'/>
    </div>
  )
}

export function DistribucionPuntajesSkeleton() {
  return (
    <div className={`bg-blue-100 w-full h-[250px] motion-safe:animate-pulse rounded-lg`}/>
  )
}

export function DistribucionProblemasSkeleton() {
  return (
    <div className='flex justify-between gap-8'>
      {[...Array(6)].map((_, probno) => {
        return (
          <div key={probno} className='flex flex-col w-full'>
            <h1 className='text-lg text-center'>
              Problema {probno+1}
            </h1>
            <div className={`bg-blue-100 w-full h-[250px] motion-safe:animate-pulse rounded-lg`}/>
          </div>
        )
      })}
    </div>
  )
}