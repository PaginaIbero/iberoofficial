import CronologiaTable from "@/app/ui/cronologia/cronologia";
import CronologiaMobileTable from "@/app/ui/cronologia/cronologia_mobile";

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Cronología
      </h1>
      <p className='text-center mb-5'>
        La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
      </p>
      <div className='hidden md:block'>
        <br/>
        <CronologiaTable/>
      </div>
      <div className='block md:hidden'>
        <CronologiaMobileTable/>
      </div>
    </div>
  )
}