import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "صيانة - Hookah Nobel",
  description: "الموقع قيد الصيانة حالياً",
}

export default function MaintenancePage() {
  return (
    <div className="bg-neutral-light min-h-screen flex flex-col items-center pt-24 px-4">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-secondary rounded-full">
            <AlertTriangle className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">الموقع قيد الصيانة</h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-2 leading-relaxed">نعتذر عن أي إزعاج</p>
        <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed">
          نحن نعمل على تحسينات مهمة لتحسين تجربتك. سيكون الموقع متاحاً قريباً جداً
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              العودة للصفحة الرئيسية
            </Button>
          </Link>
          <a href="mailto:support@hookah-nobel.com">
            <Button size="lg" variant="accent" className="w-full sm:w-auto">
              تواصل معنا
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
