import Link from "next/link"
import { BookOpen, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/books", label: "المنتجات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "فيسبوك" },
    { icon: Twitter, href: "#", label: "تويتر" },
    { icon: Instagram, href: "#", label: "انستغرام" },
    { icon: Youtube, href: "#", label: "يوتيوب" },
  ]

  const policyLinks = [
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/terms", label: "شروط الاستخدام" },
  ]

  return (
    <footer className="bg-card ">
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
            <span className="text-primary text-xl uppercase">Hookah Nobel</span>
            <p className="text-muted-foreground mt-2">
              نوفر لك أجود أنواع الشيشة والمعسلات والفحم والإكسسوارات من أفضل العلامات العالمية
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

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-teal hover:bg-primary/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyrights & Policies */}
          <div className="w-full pt-6 border-t border-border/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <p dir="rtl">© {new Date().getFullYear()} نوبل. جميع الحقوق محفوظة.</p>
              <div className="flex items-center gap-4">
                {policyLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-muted-foreground/80 hover:underline transition-colors">
                    {link.label}
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
