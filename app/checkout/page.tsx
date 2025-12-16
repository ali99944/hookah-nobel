"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Input from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/core/hooks/use-cart"
import { ArrowLeft, CreditCard, MapPin, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
    paymentMethod: "cash",
  })

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 0 ? 10 : 0
    const tax = subtotal * 0.05
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total }
  }, [items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the order to your backend
    console.log("Order submitted:", { ...formData, items, totals })

    // Clear cart and redirect to success page
    clearCart()
    alert("تم إرسال طلبك بنجاح! سنتواصل معك قريباً")
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">لا توجد منتجات في السلة</h1>
        <p className="text-muted-foreground mb-8">يرجى إضافة منتجات قبل الانتقال للدفع</p>
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
      <h1 className="text-4xl font-bold text-foreground mb-8">إتمام الطلب</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  name="fullName"
                  placeholder="الاسم الكامل"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  عنوان التوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  name="address"
                  placeholder="العنوان بالتفصيل"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="city"
                    placeholder="المدينة"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary"
                  />
                  <Input
                    name="zipCode"
                    placeholder="الرمز البريدي"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="bg-secondary"
                  />
                </div>
                <Textarea
                  name="notes"
                  placeholder="ملاحظات إضافية (اختياري)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="bg-secondary min-h-24"
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/20 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground font-medium">الدفع عند الاستلام</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/20 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground font-medium">بطاقة ائتمان / مدى</span>
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products List */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-accent rounded flex items-center justify-center shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground text-sm font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-xs">الكمية: {item.quantity}</p>
                      </div>
                      <p className="text-primary font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>المجموع الفرعي</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>الشحن</span>
                    <span>${totals.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>الضريبة</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-foreground font-bold text-xl">
                    <span>الإجمالي</span>
                    <span className="text-primary">${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-black hover:bg-primary/90 font-bold">
                  تأكيد الطلب
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <Link href="/cart">
                  <Button type="button" size="lg" variant="outline" className="w-full bg-transparent">
                    العودة للسلة
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
