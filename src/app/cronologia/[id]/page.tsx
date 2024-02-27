export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        {params.id}
      </h1>
    </div>
  )
}