import { Cronologia } from "../ui/cronologia";

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
      <Cronologia/>
    </div>
  )
}