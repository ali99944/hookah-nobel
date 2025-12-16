import { Mail } from "lucide-react"

export function ContactHero() {
  return (
    <section className="bg-card py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
          <Mail className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">تواصل معنا</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          نسعد بتواصلكم معنا للاستفسارات والاقتراحات. فريقنا جاهز للرد على جميع رسائلكم
        </p>
      </div>
    </section>
  )
}
