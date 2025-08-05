import CountryDetailsCardGrid from "@/app/ui/paises/CountryDetailsCardGrid";

export default function Page({ params: { id } }: {
  params: {
    id: string
  }
}) {
  return (
    <div className="flex flex-col text-black">
      <CountryDetailsCardGrid id={id} />
    </div>
  )
}