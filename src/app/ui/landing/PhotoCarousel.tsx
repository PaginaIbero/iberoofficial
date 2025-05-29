'use client'
import { useRef, useState, useCallback, useEffect } from "react";
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/app/ui/landing/carousel';

export default function PhotoCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  
  // Array de fotos con información adicional
  const fotos = [
    {
      src: '/images/ibero_home.png',
      alt: 'Olimpiada Iberoamericana de Matemática',
      title: 'Olimpiada Iberoamericana de Matemática',
      description: 'Competencia anual que reúne a los mejores talentos matemáticos de Iberoamérica'
    },
    {
      src: '/images/arg_team_2022.jpg',
      alt: 'Equipo Argentino 2022',
      title: 'Equipo Argentino 2022',
      description: 'El equipo argentino en la Olimpiada Iberoamericana de Matemática 2022'
    },
    {
      src: '/images/prueba_2022.png',
      alt: 'Prueba 2022',
      title: 'Prueba 2022',
      description: 'Estudiantes rindiendo la prueba de la Olimpiada Iberoamericana de Matemática 2022'
    },
    {
      src: '/images/equipos_2024.png',
      alt: 'Equipos 2024',
      title: 'Países participantes 2024',
      description: 'Equipos de todo el mundo en la Olimpiada Iberoamericana de Matemática 2024'
    }
  ];

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhoto !== null) {
        setSelectedPhoto(null)
      }
    }

    if (selectedPhoto !== null) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedPhoto])

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
      >
        <CarouselContent>
          {fotos.map((foto, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div 
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedPhoto(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={foto.src} 
                      alt={foto.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Información de la foto */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">{foto.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{foto.description}</p>
                  </div>
                  
                  {/* Indicador de número de foto */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {index + 1} / {fotos.length}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Botones de navegación */}
        <CarouselPrevious className="left-2 bg-white/90 hover:bg-white border-gray-200 text-gray-800 shadow-lg" />
        <CarouselNext className="right-2 bg-white/90 hover:bg-white border-gray-200 text-gray-800 shadow-lg" />
      </Carousel>
      
      {/* Indicadores de puntos funcionales 
      <div className="flex justify-center mt-6 space-x-2">
        {fotos.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === current 
                ? 'bg-blue-600 scale-110' 
                : 'bg-gray-300 hover:bg-gray-500'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Ir a la foto ${index + 1}`}
          />
        ))}
      </div>
      */}
      {/* Modal/Lightbox para ver foto en grande */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Botón de cerrar */}
            <button
              className="absolute top-0 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen en grande */}
            <div 
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fotos[selectedPhoto].src}
                alt={fotos[selectedPhoto].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Información de la foto en el modal */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {fotos[selectedPhoto].title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {fotos[selectedPhoto].description}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Foto {selectedPhoto + 1} de {fotos.length}
                </p>
              </div>
            </div>

            {/* Navegación en el modal */}
            {fotos.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : fotos.length - 1);
                  }}
                  aria-label="Foto anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(selectedPhoto < fotos.length - 1 ? selectedPhoto + 1 : 0);
                  }}
                  aria-label="Foto siguiente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
