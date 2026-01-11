"use client"

import { useState, useEffect } from 'react'

const promotions = [
  {
    text: "شحن لجميع المحافظات بكل ما تريد من منتجات أصلية 100% وخدمة عملاء مميزة",
    color: "bg-accent text-accent-foreground"
  },
  {
    text: "تشكيلة جديدة: نكهات فاخرة وإكسسوارات مميزة - تسوق الآن",
    // color: "bg-success text-success-foreground"
    color: "bg-accent text-accent-foreground"
  },
  {
    text: "جودة مضمونة: منتجات أصلية 100% وخدمة عملاء مميزة",
    // color: "bg-primary text-primary-foreground"
    color: "bg-accent text-accent-foreground"
  }
]

export function PromotionalBanner() {
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentPromo((prev) => (prev + 1) % promotions.length)
        setIsAnimating(false)
      }, 250)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`py-2.5 px-4 relative overflow-hidden ${promotions[currentPromo].color}`} dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div 
          className={`
            text-sm font-bold text-center transition-all duration-300 ease-in-out font-cairo
            ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          `}
        >
          {promotions[currentPromo].text}
        </div>
      </div>
    </div>
  )
}