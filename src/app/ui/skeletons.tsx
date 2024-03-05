export function TableBodySkeleton() {
  return (
    <>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-50 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
      <tr>
        <td colSpan={15} className='bg-blue-100 w-full h-12 motion-safe:animate-pulse rounded' />
      </tr>
    </>
  )
}

export function MobileTableSkeleton() {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-blue-50 w-24 h-10 my-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-36 h-5 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-24 h-10 my-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-16 h-5 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-24 h-10 my-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-24 h-5 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-24 h-10 my-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-36 h-5 motion-safe:animate-pulse rounded' />
    </div>
  )
}

export function MobileInvidividualesTableSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='bg-blue-50 w-12 h-7 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-72 h-5 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-72 h-5 mb-4 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-8 h-7 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-72 h-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-72 h-5 mb-4 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-8 h-7 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-100 w-72 h-4 mb-1 motion-safe:animate-pulse rounded' />
      <div className='bg-blue-50 w-72 h-5 motion-safe:animate-pulse rounded' />
    </div>
  )
}

export function TitleSkeleton() {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-blue-50 w-72 h-7 lg:h-10 motion-safe:animate-pulse rounded mb-1' />
      <div className='bg-blue-100 w-36 h-6 lg:h-9 motion-safe:animate-pulse rounded' />
    </div>
  )
}

export function InformacionGeneralSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='bg-blue-50 w-72 h-5 motion-safe:animate-pulse rounded mb-1' />
      <div className='bg-blue-100 w-48 h-5 motion-safe:animate-pulse rounded mb-1' />
      <div className='bg-blue-50 w-36 h-5 motion-safe:animate-pulse rounded mb-1' />
    </div>
  )
}

export function DistribucionPuntajesSkeleton() {
  return (
    <div className={`bg-blue-100 w-full h-[250px] motion-safe:animate-pulse rounded-lg`} />
  )
}

export function DistribucionProblemasSkeleton() {
  return (
    <div className='flex justify-between gap-8'>
      {[...Array(6)].map((_, probno) => {
        return (
          <div key={probno} className='flex flex-col w-full'>
            <h1 className='text-lg text-center'>
              Problema {probno + 1}
            </h1>
            <div className={`bg-blue-100 w-full h-[250px] motion-safe:animate-pulse rounded-lg`} />
          </div>
        )
      })}
    </div>
  )
}

export function CardGridSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:card-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {[...Array(6)].map((_, index) => {
        return (
          <div 
            key={index} 
            className='flex flex-col h-[184px] rounded-md bg-blue-100 motion-safe:animate-pulse'
          />
        )
      })}
    </div>
  )
}