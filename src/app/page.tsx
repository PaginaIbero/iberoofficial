'use client';

import { Suspense } from "react";
import CarouselEdiciones from "./ui/landing/carouselCards";
import CarrouselFotos from "./ui/landing/carrouselFotos";

export default function Home() {
  return (
    <div className="text-black flex flex-col">
      {/*<img src='/images/ibero_home.png' alt='Ibero Home' className="w-screen absolute left-0 object-cover" />*/}
      <h1 className='text-4xl font-semibold text-center pb-5'>
        Olimpiada Iberoamericana de Matemática
      </h1>
      <p className='text-center'>
        La Olimpíada Iberoamericana de Matemática es una competencia que da cita anualmente a estudiantes de toda Iberoamerica desde 1985. Su principal objetivo es estimular el desarrollo de jóvenes talentos y auspiciar las relaciones de amistad en la comunidad científica y educativa de los países iberoamericanos.
      </p>
      <h1 className='text-3xl font-semibold mt-5 pb-5'>
        Ediciones
      </h1>
      <Suspense fallback={'Cargando...'}>
        <CarouselEdiciones/>
      </Suspense>
      <div className="mt-12 mb-8">
        <h1 className='text-3xl font-semibold'>
          Galería de Fotos
        </h1>
        <p className='text-gray-600 mb-8 max-w-2xl'>
          Momentos destacados de las diferentes ediciones de la Olimpiada Iberoamericana de Matemática
        </p>
        <CarrouselFotos />
      </div>
    </div>
  );
}
