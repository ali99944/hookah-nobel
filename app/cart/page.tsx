"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/core/hooks/use-cart"
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 0 ? 10 : 0
    const tax = subtotal * 0.05
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total }
  }, [items])

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-2">سلة التسوق فارغة</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          لم تقم بإضافة أي منتجات بعد. تصفح منتجاتنا المميزة وابدأ التسوق الآن
        </p>
        <Link href="/products">
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
            تصفح المنتجات
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">سلة التسوق</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-0">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-contain" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-foreground font-bold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.category.name}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon-sm"
                          variant="secondary"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-foreground font-bold min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          size="icon-sm"
                          variant="secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-primary font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>المجموع الفرعي</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>الشحن</span>
                <span>${totals.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>الضريبة</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-bold text-xl">
                  <span>الإجمالي</span>
                  <span className="text-primary">${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full bg-primary text-black hover:bg-primary/90">
                  إتمام الطلب
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/products">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  متابعة التسوق
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
