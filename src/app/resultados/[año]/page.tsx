

export default function Page({params}: {params: {año: number}}) {
    return (
        <main className="flex min-h-screen flex-col text-black">
        <h1 className='text-4xl font-semibold text-center'>Resultados en el año - {params.año}</h1>
        <h2>Individuales - Equipo - Estadisticas</h2>
        </main>
    )
    }