'use client'
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import Image from "next/image"
import { useSettings } from "@/features/settings/hooks/use-settings"
import { type IconType } from "react-icons"
import { usePolicies } from "@/features/policies/hooks/use-policies"

interface SocialLink {
  icon: IconType
  href: string
  label: string
}

export function Footer() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()
  const { data: policies = [], isFetching: is_policies_loading } = usePolicies()

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/collections", label: "المجموعات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ]


  // Build social links from settings
  const socialLinks: SocialLink[] = []

  if (!is_settings_loading && settings) {
    if (settings.social_media.facebook_url) {
      socialLinks.push({
        icon: Facebook,
        href: settings.social_media.facebook_url,
        label: "فيسبوك"
      })
    }
    if (settings.social_media.twitter_url) {
      socialLinks.push({
        icon: Twitter,
        href: settings.social_media.twitter_url,
        label: "تويتر"
      })
    }
    if (settings.social_media.instagram_url) {
      socialLinks.push({
        icon: Instagram,
        href: settings.social_media.instagram_url,
        label: "انستغرام"
      })
    }
    if (settings.social_media.youtube_url) {
      socialLinks.push({
        icon: Youtube,
        href: settings.social_media.youtube_url,
        label: "يوتيوب"
      })
    }
    if (settings.social_media.tiktok_url) {
      socialLinks.push({
        icon: FaTiktok,
        href: settings.social_media.tiktok_url,
        label: "تيك توك"
      })
    }
  }

  if (is_settings_loading) {
    return (
      <footer className="bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center gap-8 animate-pulse">
            {/* Logo & Description Skeleton */}
            <div className="max-w-md w-full">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-32 bg-white/10 rounded" />
              </div>
              <div className="h-6 bg-white/10 rounded w-32 mx-auto mb-2" />
              <div className="h-4 bg-white/10 rounded w-full mb-2" />
              <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
            </div>

            {/* Navigation Links Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-4 w-16 bg-white/10 rounded" />
              ))}
            </div>

            {/* Social Links Skeleton */}
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-10 h-10 rounded-full bg-white/10" />
              ))}
            </div>

            {/* Copyrights Skeleton */}
            <div className="w-full pt-6 border-t border-border/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="h-4 w-48 bg-white/10 rounded" />
                <div className="flex items-center gap-4">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo & Description */}
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3 justify-center mb-2">
              <Image
                src="/images/logo.png"
                alt="رفوف - Rufoof"
                width={1000}
                height={60}
                className="h-20 w-auto"
              />
            </Link>
            <span className="text-primary text-xl uppercase">
              {settings?.site_identity.site_name}
            </span>
            <p className="text-muted-foreground mt-2">
              {settings?.site_identity.site_description}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}

          {/* Copyrights & Policies */}
          <div className="w-full pt-6 border-t border-border/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <p dir="rtl">{settings?.site_identity.copyright}</p>
              <div className="flex items-center gap-4">
                {policies.map((link) => (
                  <Link
                    key={link.key}
                    href={`/policies/${link.key}`}
                    className="hover:text-muted-foreground/80 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}