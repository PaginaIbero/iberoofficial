'use client'

import { useState, useEffect } from "react";

interface LogoEdicionProps {
  id: number;
}

export default function LogoEdicion({ id }: LogoEdicionProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFile = async (path: string) => {
      const fileExists = await new Promise<boolean>((resolve) => {
                          const img = new Image()
                          img.onload = () => resolve(true)
                          img.onerror = () => resolve(false)
                          img.src = path
                        });
          
      if (fileExists) {
        setLogoSrc(path)
      }
    }

    fetchFile(`/logos/${id}.png`);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!logoSrc) {
    return null
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
