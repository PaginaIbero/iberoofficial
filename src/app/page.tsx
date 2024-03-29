export default function Home() {
  return (
    <div className="text-black flex flex-col">
      <img src='/images/ibero_home.png' alt='Ibero Home' className="w-screen absolute left-0 object-cover" />
      <h1 className='text-4xl font-semibold text-center pb-5'>
        Olimpiada Iberoamericana de Matemática
      </h1>
      <p className='text-center'>
        La Olimpíada Iberoamericana de Matemática es una competencia que da cita anualmente a estudiantes de toda Iberoamerica desde 1985. Su principal objetivo es estimular el desarrollo de jóvenes talentos y auspiciar las relaciones de amistad en la comunidad científica y educativa de los países iberoamericanos.
      </p>
    </div>
  );
}
