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
    </>
  )
}