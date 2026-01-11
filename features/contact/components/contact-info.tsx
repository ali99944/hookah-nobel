'use client'

import { useSettings } from "@/features/settings/hooks/use-settings"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactInfo() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()

  if (is_settings_loading) {
    return (
      <div className="bg-card rounded-2xl p-6">
        {/* Title Skeleton */}
        <div className="h-8 bg-white/20 rounded-lg w-40 mb-6 animate-pulse" />

        {/* Contact Items Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-4">
              {/* Icon Skeleton */}
              <div className="w-12 h-12 bg-white/20 rounded-xl shrink-0 animate-pulse" />
              
              <div className="flex-1 space-y-2">
                {/* Title Skeleton */}
                <div className="h-5 bg-white/20 rounded w-24 animate-pulse" />
                
                {/* Details Skeleton */}
                <div className="h-4 bg-white/20 rounded w-full animate-pulse" />
                <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: "العنوان",
      details: settings?.contact_info.address.split("\n"),
      direction: "rtl"
    },
    {
      icon: Phone,
      title: "الهاتف",
      details: [
        settings?.contact_info.primary_phone,
        settings?.contact_info.secondary_phone,
      ],
      direction: "ltr",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: [
        settings?.contact_info.primary_email,
        settings?.contact_info.secondary_email,
      ],
      direction: "rtl",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: settings?.contact_info.working_hours.split("\n"),
      direction: "rtl",
    },
  ]

  return (
    <div className="bg-card rounded-2xl p-6">
      <h2 className="text-2xl text-primary mb-6">معلومات التواصل</h2>

      <div className="space-y-6">
        {contactDetails.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-foreground mb-1">{item.title}</h3>
              {(item?.details ?? []).map((detail) => (
                <p key={detail} className="text-sm text-muted-foreground" dir={item.direction}>
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}