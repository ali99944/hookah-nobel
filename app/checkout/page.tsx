"use client";

import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckIcon, Loader2, MapPin, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotification } from "@/core/hooks/use-notification";
import { getStorageLink } from "@/core/lib/storage";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useCreateOrder } from "@/features/orders/hooks/use-orders";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { notify } = useNotification();
  const createOrderMutation = useCreateOrder();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  }, [items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (createOrderMutation.isPending) {
      return;
    }

    try {
      const response = await createOrderMutation.mutateAsync({
        customer_name: formData.fullName.trim(),
        customer_email: formData.email.trim(),
        customer_phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        notes: formData.notes.trim(),
      });

      clearCart();
      notify.success("تم إرسال طلبك بنجاح.");

      const trackingCode = response.tracking_code || response.tracking_number;
      if (trackingCode) {
        router.push(`/track-order?code=${encodeURIComponent(trackingCode)}`);
        return;
      }

      router.push("/");
    } catch (error: any) {
      notify.error(error?.response?.data?.message || "تعذر إرسال الطلب، حاول مرة أخرى.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">السلة فارغة</h1>
        <p className="text-muted-foreground mb-8">أضف منتجات قبل الانتقال لصفحة الدفع.</p>
        <Link href="/products">
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
            تصفح المنتجات
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="fullName"
                    placeholder="الاسم الكامل"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 placeholder:text-white/40"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 placeholder:text-white/40"
                  />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 placeholder:text-white/40"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  عنوان التوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="address"
                    placeholder="العنوان بالتفصيل"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 placeholder:text-white/40"
                  />
                  <Input
                    name="city"
                    placeholder="المدينة"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 placeholder:text-white/40"
                  />
                </div>
                <Textarea
                  name="notes"
                  placeholder="ملاحظات إضافية (اختياري)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="bg-white/10 placeholder:text-white/40 text-white min-h-30"
                  style={{ resize: "none" }}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-accent rounded flex items-center justify-center shrink-0">
                        <img
                          src={getStorageLink(item.product.cover_image) || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground text-sm font-medium">{item.product.name}</p>
                        <p className="text-muted-foreground text-xs">الكمية: {item.quantity}</p>
                      </div>
                      <p className="text-primary font-bold text-sm">
                        {(item.product.price * item.quantity).toFixed(2)} EGP
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{totals.subtotal.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>الشحن</span>
                    <span>{totals.shipping.toFixed(2)} EGP</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-foreground font-bold text-xl">
                    <span>الإجمالي</span>
                    <span className="text-primary">{totals.total.toFixed(2)} EGP</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={createOrderMutation.isPending}
                    className="flex-1 bg-primary text-black hover:bg-primary/90 font-bold"
                  >
                    {createOrderMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckIcon className="w-5 h-5" />
                    )}
                    {createOrderMutation.isPending ? "جارٍ التنفيذ..." : "تأكيد الطلب"}
                  </Button>

                  <Link href="/cart" className="flex-1">
                    <Button type="button" variant="accent" className="w-full">
                      العودة للسلة
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
