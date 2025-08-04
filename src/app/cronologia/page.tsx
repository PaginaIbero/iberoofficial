import CronologyCardGrid from "@/app/ui/cronologia/CronologyCardGrid";

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <header className='pb-8'>
        <h1 className='text-4xl font-semibold font-sans text-center text-blue-500 pb-5'>
          Cronología
        </h1>
        <p className='text-center text-gray-700 px-4'>
          La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
        </p>
      </header>
      <CronologyCardGrid />
    </div>
  )
}