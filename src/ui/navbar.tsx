'use client';

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <nav className='w-full px-24 py-2 bg-white'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-blue-800 text-2xl hover:text-yellow-500 transition-colors'>
          <Link href='/'>
            <div className='flex flex-col items-left gap-0'>
              <p className='mt-0'>Olimpiada</p>
              <p>Iberoamericada de</p>
              <p>Matemática</p>
            </div>
          </Link>
        </h1>
        <div className='flex flex-basis gap-6 h-full text-md'>
          <div
            className='relative'
            onMouseOver={() => setDropdown(true)}
            onMouseOut={(e) => setDropdown(false)
            }
          >
            <div className='flex gap-1 h-full text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer'>
              LA OLIMPIADA
              <ChevronDownIcon className='w-4'/>
            </div>
            <div 
              id='dropdown'
              className={`absolute flex flex-col top-6 w-96 shadow ${dropdown ? 'block' : 'hidden'}`}
              onMouseOver={() => setDropdown(true)}
            >
              <Link
                className='bg-white p-3 text-gray-400 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/historia'}
              >
                Historia
              </Link>
              <hr/>
              <Link
                className='bg-white p-3 text-gray-400 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/reglamento'}
              >
                Reglamento
              </Link>
              <hr/>
              <Link
                className='bg-white p-3 text-gray-400 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/copa-puerto-rico'}
              >
                Copa Puerto Rico
              </Link>
            </div>
          </div>
          <Link
            href={'/cronologia'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
          >
            CRONOLOGÍA
          </Link>
          <Link
            href={'/resultados'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
          >
            RESULTADOS
          </Link>
          <Link
            href={'/pruebas'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
          >
            PRUEBAS
          </Link>
        </div>
      </div>
    </nav>
  )
}