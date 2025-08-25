import IndividualResultsCardGrid from "@/ui/resultados/YearResultsDashboard";

export default async function Page(
  props: {
    params: Promise<{
      id: number
    }>
  }
) {
  const params = await props.params;
  return (
    <div className="flex flex-col text-black">
      <IndividualResultsCardGrid id={Number(params.id)} />
    </div>
  )
}
