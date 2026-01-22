"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from "@/public/picsreducelogo1.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
  ]

  return (
    <nav className="w-full z-50  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="px-6  flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-lg font-bold leading-tight text-transparent md:text-xl">
           <Image src={logo} alt="PicsReduce - Free Image Compressor Logo" width={100} height={100} className="md:w-[150px] md:h-[150px]" priority />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "relative text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors pb-1",
                  pathname === route.path && "text-cyan-600"
                )}
              >
                {route.name}
                {pathname === route.path && (
                  <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-cyan-600 rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 rounded-b-2xl">
          <div className="space-y-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block text-base font-medium text-gray-700 hover:text-blue-600 transition",
                  pathname === route.path && "text-cyan-600"
                )}
              >
                {route.name}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}
