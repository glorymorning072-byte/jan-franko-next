import React from 'react'

const Navbar = () => {
  return (
    <header className=" sticky top-0 z-50 w-full">
      <nav className="bg-white/60 backdrop-blur-xl text-black h-25 p-5 flex justify-between items-center">
        <img src="https://janfranko.com/wp-content/uploads/2026/03/cropped-jan-franko-logo-rgb-04@2x-160x97.png" alt="JanFranko Logo" className="h-full  object-contain " />
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:text-black">Home</a></li>
          <li><a href="#programs" className="hover:text-black">Programs</a></li>
          <li><a href="#expeditions" className="hover:text-black">Expeditions</a></li>
          <li><a href="#cultural-heritage" className="hover:text-black">Cultural Heritage</a></li>
          <li><a href="#contact" className="hover:text-black">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
