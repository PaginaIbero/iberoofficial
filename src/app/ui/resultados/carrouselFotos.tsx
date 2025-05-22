'use client'
import { useRef, useState, useCallback, useEffect } from "react";
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/app/ui/landing/carousel';

interface CarrouselFotosProps {
  id: number;
}

const CarrouselFotos = ({ id }: CarrouselFotosProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [fotos, setFotos] = useState<Array<{
    src: string;
    alt: string;
    title: string;
    description: string;
  }>>([])
  const [loading, setLoading] = useState(true)
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  // Función para obtener las fotos del directorio específico
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        // Lista de extensiones de imagen comunes
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        const foundPhotos: Array<{
          src: string;
          alt: string;
          title: string;
          description: string;
        }> = []

        // Intentar cargar imágenes con diferentes extensiones
        // Usamos un enfoque de prueba y error ya que no podemos listar directorios desde el cliente
        for (let i = 1; i <= 20; i++) { // Intentamos hasta 20 imágenes
          for (const ext of imageExtensions) {
            try {
              const imagePath = `/images/${id}/${i}.${ext}`
              // Crear una promesa para verificar si la imagen existe
              const imageExists = await new Promise<boolean>((resolve) => {
                const img = new Image()
                img.onload = () => resolve(true)
                img.onerror = () => resolve(false)
                img.src = imagePath
              })

              if (imageExists) {
                foundPhotos.push({
                  src: imagePath,
                  alt: `Foto ${i} de la edición ${id}`,
                  title: `Olimpiada ${id}`,
                  description: `Momento destacado de la Olimpiada Iberoamericana de Matemática ${id}`
                })
                break // Si encontramos la imagen con esta extensión, no probamos otras
              }
            } catch (error) {
              // Continuar con la siguiente extensión
              continue
            }
          }
        }

        // Si no encontramos fotos específicas para este ID, usar fotos por defecto
        if (foundPhotos.length === 0) {
          const defaultPhotos = [
            {
              src: '/images/ibero_home.png',
              alt: 'Olimpiada Iberoamericana de Matemática',
              title: `Olimpiada ${id}`,
              description: `Olimpiada Iberoamericana de Matemática ${id}`
            }
          ]
          
          // Intentar agregar algunas fotos específicas si existen
          const specificPhotos = [
            { path: '/images/arg_team_2022.jpg', condition: id === 2022 },
            { path: '/images/prueba_2022.png', condition: id === 2022 },
            { path: '/images/equipos_2024.png', condition: id === 2024 }
          ]

          for (const photo of specificPhotos) {
            if (photo.condition) {
              try {
                const imageExists = await new Promise<boolean>((resolve) => {
                  const img = new Image()
                  img.onload = () => resolve(true)
                  img.onerror = () => resolve(false)
                  img.src = photo.path
                })

                if (imageExists) {
                  defaultPhotos.push({
                    src: photo.path,
                    alt: `Foto de la edición ${id}`,
                    title: `Olimpiada ${id}`,
                    description: `Momento destacado de la Olimpiada Iberoamericana de Matemática ${id}`
                  })
                }
              } catch (error) {
                // Continuar sin esta foto
              }
            }
          }

          setFotos(defaultPhotos)
        } else {
          setFotos(foundPhotos)
        }
      } catch (error) {
        console.error('Error al cargar las fotos:', error)
        // Foto por defecto en caso de error
        setFotos([{
          src: '/images/ibero_home.png',
          alt: 'Olimpiada Iberoamericana de Matemática',
          title: `Olimpiada ${id}`,
          description: `Olimpiada Iberoamericana de Matemática ${id}`
        }])
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [id])

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

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (fotos.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center text-gray-500 py-8">
          No se encontraron fotos para esta edición.
        </div>
      </div>
    )
  }

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

export default CarrouselFotos;
