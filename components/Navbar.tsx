import React from 'react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-secondary/80 backdrop-blur-md text-primary h-20 px-6 md:px-12 flex justify-between items-center border-b border-primary/10">
        <img 
          src="https://janfranko.com/wp-content/uploads/2026/03/cropped-jan-franko-logo-rgb-04@2x-160x97.png" 
          alt="JanFranko Logo" 
          className="h-12 object-contain" 
        />
        <ul className="flex space-x-6 font-serif text-sm tracking-widest uppercase">
          <li><a href="#home" className="link-underline transition-colors hover:text-accent">Home</a></li>
          <li><a href="#programs" className="link-underline transition-colors hover:text-accent">Programs</a></li>
          <li><a href="#expeditions" className="link-underline transition-colors hover:text-accent">Expeditions</a></li>
          <li><a href="#cultural-heritage" className="link-underline transition-colors hover:text-accent">Cultural Heritage</a></li>
          <li><a href="#contact" className="link-underline transition-colors hover:text-accent">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
