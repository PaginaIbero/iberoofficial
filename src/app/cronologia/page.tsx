import Table from "@/app/ui/cronologia/table";

export default function Page() {
  return (
    <div className="flex flex-col">
      <h1 className='text-4xl font-semibold text-center'>
        Cronología
      </h1>
      <p className='text-center'>
        La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
      </p>
      <br/>
      <Table/>
    </div>
  )
}