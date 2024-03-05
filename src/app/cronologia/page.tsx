import Table from "@/app/ui/cronologia/table";
import MobileTable from "@/app/ui/cronologia/mobile";

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Cronología
      </h1>
      <p className='text-center'>
        La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
      </p>
      <div className='hidden md:block'>
        <br/>
        <Table/>
      </div>
      <div className='block md:hidden'>
        <MobileTable/>
      </div>
    </div>
  )
}