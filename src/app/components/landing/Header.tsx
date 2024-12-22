import React from 'react'

function Header() {
  return (
    <div>
              <header className="container mx-auto p-4">
        <nav className="flex justify-between items-center border-b-slate-600">
          <div className="text-red-600 font-extrabold text-2xl"><span className="text-black">ONE</span> EL1TE AUTOMOTIVE</div>
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-red-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-red-600">Cars</a>
            <a href="#" className="text-gray-600 hover:text-red-600">About</a>
            <a href="#" className="text-gray-600 hover:text-red-600">Contact</a>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header