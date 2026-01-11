'use client'

import { Button } from "@/components/ui/button"
import { useSettings } from "@/features/settings/hooks/use-settings"
import { Sparkles, ArrowLeft, PhoneCall } from "lucide-react"
import Link from "next/link"

function HeroSection() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()

  if (is_settings_loading) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/40 animate-pulse" />

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          
          {/* Badge */}
          <div className="mx-auto w-56 h-8 bg-white/10 rounded-full" />

          {/* Title */}
          <div className="space-y-4">
            <div className="h-10 md:h-14 w-3/4 mx-auto bg-white/10 rounded-lg" />
            <div className="h-10 md:h-14 w-1/2 mx-auto bg-white/10 rounded-lg" />
          </div>

          {/* Description */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="h-5 w-full bg-white/10 rounded" />
            <div className="h-5 w-5/6 mx-auto bg-white/10 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="h-10 w-36 bg-primary/40 rounded-full" />
            <div className="h-10 w-36 bg-white/10 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  )
}


  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden ">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/smoke-2.png"
            alt="Luxury shisha lounge with premium hookahs and golden accents dark ambient lighting"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-sm ">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">تجربة فاخرة لعشاق الشيشة</span>
            </div>

            <h1 className="text-4xl md:text-6xl  text-balance leading-tight">
              <span className="text-primary uppercase">{settings?.site_identity.site_name}</span>
              <br />
              <span className="text-white">لتجربة استثنائية</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {settings?.site_identity.site_description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button size="lg" className="bg-success hover:bg-success/80 px-8">
                تواصل معنا
                <PhoneCall className="mr-2 h-5 w-5" />
              </Button>
              <Link href="/products">
                <Button size="lg" variant="accent" className=" px-8">
                  تصفح المنتجات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection