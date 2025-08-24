import CountryDetailsCardGrid from "@/ui/paises/CountryDashboard";

export default async function Page(
  props: {
    params: Promise<{
      id: string
    }>
  }
) {
  const params = await props.params;
  return (
    <div className="flex flex-col text-black">
      <CountryDetailsCardGrid id={params.id} />
    </div>
  )
}