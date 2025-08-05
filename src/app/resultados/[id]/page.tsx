import IndividualResultsCardGrid from "@/app/ui/resultados/IndividualResultsCardGrid";

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  return (
    <div className="flex flex-col text-black">
      <IndividualResultsCardGrid id={Number(params.id)} />
    </div>
  )
}
