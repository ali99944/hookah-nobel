'use client'

import { Button } from "@/components/ui/button"
import { useSettings } from "@/features/settings/hooks/use-settings"
import { MessageCircle } from "lucide-react"
import Link from "next/link"


export function CTASection() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()

  if (is_settings_loading) {
    return (
      <section className="py-12 bg-accent relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url('/arabic-geometric-pattern-seamless.jpg')`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-pulse">
            {/* Title Skeleton */}
            <div className="h-12 bg-secondary/40 rounded-lg w-80 mx-auto mb-4" />
            {/* Description Skeleton */}
            <div className="h-5 bg-secondary/40 rounded w-96 mx-auto mb-2" />
            <div className="h-5 bg-secondary/40 rounded w-64 mx-auto" />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex sm:flex-row gap-4 justify-center animate-pulse">
            <div className="h-12 bg-secondary/40 rounded-lg w-48" />
            <div className="h-12 bg-secondary/40 rounded-lg w-32" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url('/arabic-geometric-pattern-seamless.jpg')`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans text-black mb-4 text-balance">
            هل تبحث عن مساعدة؟
          </h2>
          <p className="font-body text-black/70 max-w-xl mx-auto">
            تواصل معنا الآن عبر واتساب للحصول على استشارة مجانية وعروض خاصة
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex sm:flex-row gap-4 justify-center">
          <Link target="_blank" href={`https://wa.me/${settings?.contact_info.whatsapp_number}`}>
            <Button
              size="lg"
              className="px-10 bg-success hover:bg-success/90"
            >
              <span>تواصل عبر واتساب</span>
              <MessageCircle />
            </Button>
          </Link>
          <Link href='/contact'>
            <Button
              size="lg"
              variant="secondary"
            >
              تواصل معنا
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}