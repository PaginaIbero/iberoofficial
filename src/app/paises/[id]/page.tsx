import CountryDetailsCardGrid from "@/ui/paises/CountryDashboard";

export default async function Page({ params }: {
  params: {
    id: string
  }
}) {
  return (
    <div className="flex flex-col text-black">
      <CountryDetailsCardGrid id={params.id} />
    </div>
  )
}