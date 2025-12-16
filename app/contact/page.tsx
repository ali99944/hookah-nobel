import { ContactForm } from "@/features/contact/components/contact-form"
import { ContactHero } from "@/features/contact/components/contact-hero"
import { ContactInfo } from "@/features/contact/components/contact-info"
import ContactSocialMedia from "@/features/contact/components/contact-social-media"

export const metadata = {
  title: "تواصل معنا - رفوف",
  description: "تواصل مع فريق رفوف للاستفسارات والاقتراحات",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ContactHero />
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ContactForm />
                <ContactSocialMedia />
              </div>
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
