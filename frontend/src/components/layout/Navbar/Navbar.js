import React from 'react'
import Logo from "../../../assets/logo.png"
import Link from 'next/link'

function Navbar() {
  return (
    <div
    className="top-0 navbar fixed w-full  z-30 bg-white"
    style={{ boxShadow: "0px 4px 4px 0px rgba(232, 232, 232, 0.25)" }}
  >
    <nav className="container mx-auto py-6 px-4 lg:px-20 h-max  z-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img
            className="text-gray-300 h-[40px]"
            src={Logo.src}
            alt="Promo Data"
          />
        </Link>

     

       
      </div>
    </nav>
  </div>
  )
}

export default Navbar