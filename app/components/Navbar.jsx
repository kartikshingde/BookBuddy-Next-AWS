'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          BookBuddy
        </Link>

        {/* Hamburger button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          {open ? '✕' : '☰'}
        </button>

        {/* Menu items */}
        <div
          className={`md:flex md:items-center md:gap-8 overflow-hidden transition-[max-height] duration-300 ease-in-out
            ${open ? 'max-h-40' : 'max-h-0'} md:max-h-full`}
        >
          {['Home', 'Explore', 'Add Book', 'Requests', 'Profile'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s/g, '-')}`}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => setOpen(false)} // Close menu on link click (mobile)
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
