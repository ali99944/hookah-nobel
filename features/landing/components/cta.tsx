import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock, Send } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-12  relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-sans text-foreground mb-4 text-balance">هل تبحث عن مساعدة؟</h2>
          <p className="font-body text-foreground/70 max-w-xl mx-auto">
            تواصل معنا الآن عبر واتساب للحصول على استشارة مجانية وعروض خاصة
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="flex gap-4 px-4">
              <div className="p-3 bg-primary/10 rounded-full h-fit w-fit">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-sans text-foreground mb-1">الموقع</h3>
              <p className="font-body text-sm text-foreground/60">
                شارع الفخمة رقم 123
                <br />
                حي Downtown
              </p>
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex gap-4 px-4">
              <div className="p-3 bg-primary/10 rounded-full h-fit w-fit">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-sans text-foreground mb-1">الاوقات</h3>
              <p className="font-body text-sm text-foreground/60">
                يوميا: 4م - 2ص
                <br />
                أيام العطل: 2م - 3ص
              </p>
            </div>
            </CardContent>
            
          </Card>

          <Card>
            <CardContent className="flex gap-4 px-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit h-fit">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-sans text-foreground mb-1">اتصل بالهاتف</h3>
                <p className="font-body text-sm text-foreground/60">
                  +1 (555) 123-4567
                  <br />
                  مرحبا@shisha.cafe
                </p>
              </div>
            </CardContent>
            
          </Card>

          <Card>
            <CardContent className="flex gap-4 px-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit h-fit">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-sans text-foreground mb-1">اتصل بالهاتف</h3>
              <p className="font-body text-sm text-foreground/60">
                +1 (555) 123-4567
                <br />
                مرحبا@shisha.cafe
              </p>
            </div>
            </CardContent>
            
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="px-10 bg-[#20ba5a] hover:bg-[#20ba5a]/90"
          >
            <span>تواصل عبر واتساب</span>
            <Send />
          </Button>
          <Button
            size="lg"
            variant="secondary"
          >
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  )
}

