'use client'
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/app/ui/landing/carousel';

const CarrouselFotos = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))
  return (
    <Carousel
      plugins={[plugin.current]}
    >
      <CarouselContent>
        <CarouselItem>
          <img src='/images/ibero_home.png' alt='Ibero Home' className="max-w-[600px] mx-auto h-[200px] object-cover border-4 border-black" />
        </CarouselItem>
        <CarouselItem>
          <img src='/images/2023.jpg' alt='Ibero Home' className="max-w-[600px] mx-auto h-[200px] object-cover border-4 border-black" />
        </CarouselItem>
        <CarouselItem>
          <img src='/images/2022.jpg' alt='Ibero Home' className="max-w-[600px] mx-auto h-[200px] object-cover border-4 border-black" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}

export default CarrouselFotos;