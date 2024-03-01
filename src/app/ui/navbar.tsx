'use client';

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CiMenuBurger } from "react-icons/ci";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <nav className='w-full bg-white relative'>
      <div className='flex items-center justify-between sm:px-24 px-10 py-2'>
        <h1 className='font-bold text-blue-800 sm:text-2xl text-xl hover:text-yellow-500 transition-colors'>
          <Link href='/'>
            <div className='flex flex-col items-left gap-0'>
              <p className='mt-0'>Olimpiada</p>
              <p>Iberoamericada de</p>
              <p>Matemática</p>
            </div>
          </Link>
        </h1>
        <div className='flex-basis gap-6 h-full text-md lg:flex hidden'>
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
        <div id="menu-hamburger" className="lg:hidden flex h-full">
            <CiMenuBurger className="w-8 h-8 text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer" onClick={() => setMenu(!menu)}/>
        </div>
      </div>
      <div className={`${menu ? 'block pt-3 bg-gray-200 w-full animate-fade-down duration-200' : 'hidden'} lg:hidden`}>
            <div className='flex-col flex-basis flex gap-6 h-full text-md sm:px-24 px-10 py-2'>
          <div
            className='relative'
            onClick={() => setDropdown(!dropdown)}
          >
            <div className='flex gap-1 pb-2 h-full text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer'>
              LA OLIMPIADA
              <ChevronDownIcon className='w-4'/>
            </div>
            <div 
              id='dropdown'
              className={`flex flex-col ${dropdown ? 'block ml-5' : 'hidden'}`}
              onClick={() => setDropdown(!dropdown)}
            >
              <Link
                className='bg-white/70 p-3 text-gray-500 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/historia'}
                onClick={() => setMenu(!menu)}
              >
                Historia
              </Link>
              <hr/>
              <Link
                className='bg-white/70 p-3 text-gray-500 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/reglamento'}
                onClick={() => setMenu(!menu)}
              >
                Reglamento
              </Link>
              <hr/>
              <Link
                className='bg-white/70 p-3 text-gray-500 hover:text-blue-800 hover:bg-blue-100 transition-colors'
                href={'/olimpiada/copa-puerto-rico'}
                onClick={() => setMenu(!menu)}
              >
                Copa Puerto Rico
              </Link>
            </div>
          </div>
          <Link
            href={'/cronologia'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
            onClick={() => setMenu(!menu)}
          >
            CRONOLOGÍA
          </Link>
          <Link
            href={'/resultados'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
            onClick={() => setMenu(!menu)}
          >
            RESULTADOS
          </Link>
          <Link
            href={'/pruebas'}
            className='text-gray-400 hover:text-blue-800 transition-colors'
            onClick={() => setMenu(!menu)}
          >
            PRUEBAS
          </Link>
        </div>
      </div>
    </nav>
  )
}