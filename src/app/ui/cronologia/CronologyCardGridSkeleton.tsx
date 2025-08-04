export function CronologyCardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item: number) => (
        <div key={item} className="bg-blue-100 rounded-lg h-96 motion-safe:animate-pulse" />
      ))}
    </div>
  )
}