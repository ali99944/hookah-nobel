'use client'

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import { IconType } from "react-icons"
import { FaTiktok } from "react-icons/fa6"
import { useSettings } from "@/features/settings/hooks/use-settings"

interface Social {
    name: string
    icon: IconType
    url: string
}

function SocialIcon({ social }: { social: Social }) {
    const Icon = social.icon

    return (
        <Link href={social.url} target="_blank" rel="noopener noreferrer" className="group">
            <div className="flex flex-col items-center">
                <div className="p-3 bg-accent group-hover:bg-accent/80 transition-all duration-300 rounded-full mb-2">
                    <Icon className="text-black" size={24}/>
                </div>
                <span className="text-foreground text-sm">{social.name}</span>
            </div>
        </Link>
    )
}

function ContactSocialMedia() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()

  // Show skeleton loader while loading
  if (is_settings_loading) {
    return (
      <div className="bg-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-12">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col items-center animate-pulse">
              <div className="w-14 h-14 bg-white/10 rounded-full mb-2" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Build socials array from settings
  const socials: Social[] = []

  if (settings?.social_media.instagram_url) {
    socials.push({
      name: 'Instagram',
      icon: Instagram,
      url: settings.social_media.instagram_url
    })
  }

  if (settings?.social_media.facebook_url) {
    socials.push({
      name: 'Facebook',
      icon: Facebook,
      url: settings.social_media.facebook_url
    })
  }

  if (settings?.social_media.youtube_url) {
    socials.push({
      name: 'Youtube',
      icon: Youtube,
      url: settings.social_media.youtube_url
    })
  }

  if (settings?.social_media.twitter_url) {
    socials.push({
      name: 'Twitter',
      icon: Twitter,
      url: settings.social_media.twitter_url
    })
  }

  if (settings?.social_media.tiktok_url) {
    socials.push({
      name: 'TikTok',
      icon: FaTiktok,
      url: settings.social_media.tiktok_url
    })
  }

  // Don't render if no social media links exist
  if (socials.length === 0) {
    return null
  }

  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-center gap-12">
        {socials.map(soc => <SocialIcon key={soc.name} social={soc} />)}
      </div>
    </div>
  )
}

export default ContactSocialMedia