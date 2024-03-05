'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("mousedown", (event: MouseEvent) => {
      console.log(dropdownRef.current?.contains(event.target as Node))
      if (!mobileDropdownRef.current?.contains(event.target as Node) &&
          !dropdownRef.current?.contains(event.target as Node)) { 
        setDropdown(false);
      } else if (!menuRef.current?.contains(event.target as Node)) { 
        setMenu(false);
      }
    });
  }, [dropdownRef, mobileDropdownRef, menuRef]);
  return (
    <nav className='fixed top-0 w-full bg-white z-10'>
      <div className='flex items-center justify-between sm:px-24 px-10 py-2'>
        <h1 className='font-bold text-blue-800 text-xl md:text-2xl md:hover:text-yellow-500 transition-colors'>
          <Link href='/'>
            <div className='flex flex-col items-left gap-0'>
              <p className='mt-0'>Olimpiada</p>
              <p>Iberoamericada de</p>
              <p>Matemática</p>
            </div>
          </Link>
        </h1>
        <div className='hidden flex-basis lg:flex gap-6 h-full text-md'>
          <div
            className='relative'
            onMouseOver={() => setDropdown(true)}
            onMouseOut={(e) => setDropdown(false)}
            ref={dropdownRef}
          >
            <div className='flex gap-1 h-full text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer'>
              LA OLIMPIADA
              <ChevronDownIcon className='w-4' />
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
              <hr />
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
        <div id="menu-hamburger" className="flex lg:hidden h-full">
          <CiMenuBurger 
            className={`${menu ? 'hidden' : 'block'} w-8 h-8 text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer animate-fade-left`} 
            onClick={() => setMenu(true)}
          />
          <AiOutlineClose 
            className={`${menu ? 'block' : 'hidden'} w-8 h-8 text-gray-400 hover:text-blue-800 transition-colors hover:cursor-pointer animate-fade-left`} 
            onClick={() => {
              setMenu(false);
              setDropdown(false);
            }}
          />
        </div>
      </div>
      <div 
        className={`${menu ? 'absolute pt-3 bg-white bg-opacity-80 w-full animate-fade-down duration-200 backdrop-blur-sm' : 'hidden animate-fade-up'} lg:hidden`}
        ref={menuRef}
      >
        <div className='flex flex-col sm:px-24 px-10 py-2 text-md'>
          <div
            className='relative'
            onClick={() => setDropdown(!dropdown)}
            ref={mobileDropdownRef}
          >
            <div className='flex gap-1 py-3 text-gray-400'>
              LA OLIMPIADA
              <ChevronDownIcon className='w-4' />
            </div>
            <div
              id='dropdown'
              className={`absolute flex flex-col top-6 w-96 mt-4 ml-5 bg-white ${dropdown ? 'block backdrop-blur-sm' : 'hidden'}`}
            >
              <Link
                className='p-3 text-gray-400'
                href={'/olimpiada/historia'}
                onClick={() => setMenu(!menu)}
              >
                Historia
              </Link>
              <hr/>
              <Link
                className='p-3 text-gray-400'
                href={'/olimpiada/reglamento'}
                onClick={() => setMenu(!menu)}
              >
                Reglamento
              </Link>
              <hr/>
              <Link
                className='p-3 text-gray-400'
                href={'/olimpiada/copa-puerto-rico'}
                onClick={() => setMenu(!menu)}
              >
                Copa Puerto Rico
              </Link>
            </div>
          </div>
          <Link
            href={'/cronologia'}
            className='py-3 text-gray-400'
            onClick={() => setMenu(!menu)}
          >
            CRONOLOGÍA
          </Link>
          <Link
            href={'/resultados'}
            className='py-3 text-gray-400'
            onClick={() => setMenu(!menu)}
          >
            RESULTADOS
          </Link>
          <Link
            href={'/pruebas'}
            className='py-3 text-gray-400'
            onClick={() => setMenu(!menu)}
          >
            PRUEBAS
          </Link>
        </div>
      </div>
    </nav>
  )
}