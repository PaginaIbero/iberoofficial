'use client'
import { useState, useEffect } from "react";

interface LogoEdicionProps {
  id: number;
}

const LogoEdicion = ({ id }: LogoEdicionProps) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLogo = async () => {
      try {
        setLoading(true)
        // Lista de extensiones de imagen comunes para logos
        const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'webp']
        let logoFound = false

        // Intentar cargar logo específico del año
        for (const ext of imageExtensions) {
          try {
            const logoPath = `/images/logos/${id}.${ext}`
            // Crear una promesa para verificar si el logo existe
            const logoExists = await new Promise<boolean>((resolve) => {
              const img = new Image()
              img.onload = () => resolve(true)
              img.onerror = () => resolve(false)
              img.src = logoPath
            })

            if (logoExists) {
              setLogoSrc(logoPath)
              logoFound = true
              break
            }
          } catch (error) {
            continue
          }
        }

        // Si no encontramos logo específico, intentar con nombres alternativos
        if (!logoFound) {
          const alternativeNames = [
            `logo_${id}`,
            `logo${id}`,
            `ibero_${id}`,
            `olimpiada_${id}`
          ]

          for (const name of alternativeNames) {
            for (const ext of imageExtensions) {
              try {
                const logoPath = `/images/logos/${name}.${ext}`
                const logoExists = await new Promise<boolean>((resolve) => {
                  const img = new Image()
                  img.onload = () => resolve(true)
                  img.onerror = () => resolve(false)
                  img.src = logoPath
                })

                if (logoExists) {
                  setLogoSrc(logoPath)
                  logoFound = true
                  break
                }
              } catch (error) {
                continue
              }
            }
            if (logoFound) break
          }
        }

        // Si aún no encontramos logo, usar logo por defecto
        if (!logoFound) {
          // Verificar si existe un logo por defecto
          const defaultLogoExists = await new Promise<boolean>((resolve) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
            img.src = '/images/ibero_home.png'
          })

          if (defaultLogoExists) {
            setLogoSrc('/images/ibero_home.png')
          }
        }
      } catch (error) {
        console.error('Error al cargar el logo:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLogo()
  }, [id])

  if (loading) {
    return (
      <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!logoSrc) {
    return null // No mostrar nada si no hay logo
  }

  return (
    <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
      <img
        src={logoSrc}
        alt={`Logo Olimpiada ${id}`}
        className="max-w-full max-h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
        title={`Logo de la Olimpiada Iberoamericana de Matemática ${id}`}
      />
    </div>
  )
}

export default LogoEdicion;
