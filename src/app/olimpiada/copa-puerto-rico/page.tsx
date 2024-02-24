import { Section } from "../reglamento/page";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <h1 className='text-4xl font-semibold text-center'>Copa Puerto Rico</h1>
      <p className='text-center'>
        La Copa Puerto Rico se otorga anualmente al país de mejor progreso relativo en la OIM.
      </p>
      <br/>
      <h2 className='text-2xl font-semibold'>
        Reglamento
      </h2>
      <Section title='Artículo 1'>
        <p className='my-2'>
          Para que un país pueda optar por la Copa Puerto Rico en la OIM del año x+2, debe satisfacer los requisitos siguientes:
        </p>
        <ul className='list-decimal pl-6 my-2'>
          <li>
            Haber participado en las Olimpiadas de los años x y x+1.
          </li>
          <li>
          Participar con equipo completo.
          </li>
        </ul>
      </Section>
      <Section title='Artículo 2'>
        <p className='my-2'>
          El salto de progreso relativo S, alcanzado por un país en la OIM del año x+2, y que satisface los requerimientos del Artículo 1, es un número que se determina mediante el procedimiento siguiente:
        </p>
        <ul className='list-decimal pl-6 my-2'>
          <li>
            Se sumarán los puntos obtenidos por ese país durante las olimpiadas de los años x y x+1, y se dividirá esa cantidad por el total de alumnos que integraron los equipos esos años. Este número se multiplicará por 100 y se dividirá entre el promedio total de calificaciones de los años x y x+1 (esto es, la suma de todas las calificaciones de todos los alumnos participantes en las olimpíadas x y x+1, dividida entre el número total de participantes en esas olimpiadas). Este número representa el promedio normalizado P que obtuvo cada país en los últimos años.
          </li>
          <li>
            El total de puntos alcanzado por el país en la OIM del año x+2 se divide entre 4 y entre el promedio general de calificaciones de ese año, y se multiplica por 100. El número obtenido, Q, es el promedio normalizado por país en esta Olimpiada.
          </li>
          <li>
            El salto se define mediante la fórmula:
            <p className='text-center'>S = Q - (11/10)P</p>
          </li>
        </ul>
      </Section>
      <Section title='Artículo 3'>
        <p className='my-2'>
          El país ganador de la Copa Puerto Rico es aquel que presenta el mayor salto de progreso relativo S. En caso de empate entre dos o más países, se seguirá el esquema ordenado siguiente, relativo a la Olimpiada x+2, por eliminación sucesiva, hasta obtener el país ganador.
        </p>
        <ul className='list-decimal pl-6 my-2'>
          <li>
            El país que presenta el mayor Q.
          </li>
          <li>
            El país ganador de más medallas de oro.
          </li>
          <li>
            El país ganador de más medallas de plata.
          </li>
          <li>
            El país ganador de más medallas de bronce.
          </li>
          <li>
            El país ganador de más menciones.
          </li>
        </ul>
      </Section>
      <Section title='Artículo 4'>
        <p className='my-2'>
          En caso de presentarse cualquier situación no contemplada en este Reglamento, el Jurado Internacional tomará decisiones a partir de las proposiciones de sus integrantes, las cuales se tomarán por mayoría de votos, uno por cada país, y con el voto dirimente del Presidente del Jurado en caso de empate en la votación.
        </p>
      </Section>
    </main>
  )
}