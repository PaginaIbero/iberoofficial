import Table from "@/app/ui/cronologia/table";
import { getBaseUrl } from "@/lib/baseUrl";

export default async function Page() {
  const data = await fetch(`${getBaseUrl()}/api/cronologia`).then((res) => res.json());
  return (
    <div className="flex flex-col">
      <h1 className='text-4xl font-semibold text-center'>
        Cronología
      </h1>
      <p className='text-center'>
        La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
      </p>
      <br/>
      <Table data={data}/>
    </div>
  )
}