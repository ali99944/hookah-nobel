"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    { icon: Award, title: "5000+", description: "عميل راضٍ" },
    { icon: Users, title: "500+", description: "منتج متنوع" },
    { icon: Globe, title: "8", description: "سنوات خبرة" },
    { icon: Heart, title: "100%", description: "ضمان الجودة" },
  ]

  return (
    <div className="bg-neutral-light pb-12">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl text-primary mb-6 tracking-tight">Hookah Nobel</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            نوفر لك أجود أنواع الشيشة والمعسلات والفحم والإكسسوارات من أفضل العلامات العالمية
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding max-w-7xl mx-auto py-12 px-4">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image src="/images/logo.png" alt="Hookah Nobel Logo" width={460} height={200} />
            </div>
            <div>
              <h2 className="font text-4xl font-semibold text-primary mb-6 tracking-tight">قصتنا</h2>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                Hookah Nobel هو متجرك المتخصص في عالم الشيشة والمعسلات الفاخرة. بدأنا رحلتنا بشغف كبير لتقديم تجربة
                استثنائية لعشاق الشيشة في جميع أنحاء المنطقة.
              </p>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                نفخر بتوفير مجموعة واسعة من أفضل المنتجات العالمية، من الشيشات الفاخرة إلى المعسلات الأصلية والفحم
                الطبيعي عالي الجودة. نحن نؤمن بأن كل جلسة شيشة يجب أن تكون تجربة لا تُنسى.
              </p>
              <p className="text-lg text-neutral-mid mb-8 leading-relaxed">
                فريقنا من الخبراء مستعد دائماً لمساعدتك في اختيار المنتجات المثالية التي تناسب ذوقك واحتياجاتك. نحن
                ملتزمون بتقديم أفضل خدمة عملاء وأسرع توصيل لضمان رضاك التام.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 section-padding bg-neutral-light py-12 max-w-7xl mx-auto ">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group bg-secondary p-6 rounded-4xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6 group-hover:bg-primary/90 transition-all duration-300">
                  <value.icon className="h-8 w-8 text-gray-800" />
                </div>
                <h3 className=" text-3xl font-semibold text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4">
        <div className=" bg-secondary text-white max-w-7xl mx-auto p-8 rounded-4xl ">
          <div className="container-luxury text-center">
            <h2 className="text-4xl font-semibold mb-6 text-primary tracking-tight">انضم إلى عائلة Hookah Nobel</h2>
            <p className="text-lg mb-8 text-primary/90 max-w-2xl mx-auto leading-relaxed">
              اكتشف عالم الشيشة الفاخرة معنا. استمتع بتجربة تسوق فريدة وخدمة عملاء مميزة
            </p>
            <div className="flex flex-wrap flex-row gap-4 justify-center">
              <Link href={"/"}>
                <Button size="lg">تسوق الآن</Button>
              </Link>
              <Link href={"/contact"}>
                <Button variant="outline" size="lg">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
