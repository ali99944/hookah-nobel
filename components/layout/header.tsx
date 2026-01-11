"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Home, Users, MapPin, BoxIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PromotionalBanner } from "./promotional-banners"
import { useCart } from "@/features/cart/hooks/use-cart"

const navLinks = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/collections", label: "المجموعات", icon: BoxIcon },
  { href: "/about", label: "من نحن", icon: Users },
  { href: "/contact", label: "تواصل معنا", icon: MapPin },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items, isLoading: is_cart_loading } = useCart()

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
    <PromotionalBanner />
      <header className=" bg-[#18181a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/images/logo.png" alt="Shisha Logo" width={48} height={48} className="object-contain" />
            <div className="flex flex-col items-center justify-center">
              <span className="text-primary text-xl uppercase">Hookah Nobel</span>
              <span className="text-muted-foreground text-xs">لجميع مستلزمات الشيش</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-md tracking-wide text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full py-1.5 px-3 transition-colors duration-300 flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href={'/cart'}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-accent relative">
                <ShoppingCart className="h-5 w-5" />
                {is_cart_loading ? (
                  <span className="absolute top-0 right-0 text-xs font-semibold bg-primary text-black rounded-full w-4 h-4 animate-pulse">
                    
                  </span>
                ) : (
                  <span className="absolute top-0 right-0 text-xs font-semibold bg-primary text-black rounded-full w-4 h-4">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button className="bg-primary text-black hover:bg-primary/90">تصفح منتجاتنا</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-foreground/60 hover:text-foreground transition-colors py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <Link href={'/products'} className="flex-1">
                  <Button className="w-full">
                    تصفح منتجاتنا
                  </Button>
                </Link>
                <Link href={'/cart'} className="flex-1">
                  <Button variant="accent" className="w-full" >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute top-0 right-0 text-xs font-semibold bg-primary text-black rounded-full w-4 h-4">
                    {items.length}
                  </span>
                  سلة المشتريات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    </div>
  )
}
