import { Cronologia } from "@/app/ui/Cronologia";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>Historia</h1>
      <Cronologia />
    </main>
  )
}