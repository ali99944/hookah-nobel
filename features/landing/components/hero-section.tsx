import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

function HeroSection() {
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
              <span className="text-primary uppercase">Hookah Nobel</span>
              <br />
              <span className="text-white">لتجربة استثنائية</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              نوفر لك أجود أنواع الشيشة والمعسلات والفحم والإكسسوارات من أفضل العلامات العالمية
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                اطلب الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Link href="/products">
                <Button size="lg" variant="outline" className=" px-8">
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