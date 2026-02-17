"use client";

import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock, Loader2, PackageSearch, Search, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { getStorageLink } from "@/core/lib/storage";
import { useTrackOrder } from "@/features/orders/hooks/use-orders";
import type { Order, OrderStatus } from "@/features/orders/types";

const statusClasses: Record<OrderStatus, string> = {
  pending: "bg-accent/90 text-black",
  paid: "bg-primary text-black",
  processing: "bg-primary/20 text-primary",
  shipped: "bg-white/10 text-white",
  delivered: "bg-success/25 text-success",
  cancelled: "bg-destructive/20 text-red-300",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "قيد الانتظار",
  paid: "مدفوع",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2.5 border-b border-border/40 last:border-none">
      <span className="text-sm text-white/50">{label}</span>
      <span className="col-span-2 text-sm text-white font-medium break-words">{value || "-"}</span>
    </div>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialCode = useMemo(() => searchParams.get("code")?.trim() ?? "", [searchParams]);

  const [codeInput, setCodeInput] = useState(initialCode);
  const [submittedCode, setSubmittedCode] = useState(initialCode);
  const { data, isLoading, error, isFetching } = useTrackOrder(submittedCode);
  const order = data as unknown as Order | undefined;

  useEffect(() => {
    if (initialCode) {
      setCodeInput(initialCode);
      setSubmittedCode(initialCode);
    }
  }, [initialCode]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = codeInput.trim().toUpperCase();
    if (!normalized) return;
    setSubmittedCode(normalized);
  };

  const resolveImage = (image: string | null) => {
    if (!image) return "/images/product-placeholder.png";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return getStorageLink(image) || "/images/product-placeholder.png";
  };

  const errorMessage = (error as any)?.response?.data?.message || "لم يتم العثور على الطلب.";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <PackageSearch className="w-5 h-5 text-primary" />
            تتبع طلبك
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              placeholder="أدخل كود تتبع الطلب"
              className="bg-white/10 placeholder:text-white/40"
            />
            <Button type="submit" disabled={isFetching} className="bg-primary text-black hover:bg-primary/90 sm:min-w-32">
              {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              بحث
            </Button>
          </form>
        </CardContent>
      </Card>

      {!submittedCode && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            أدخل كود الطلب لعرض تفاصيل الشحن والمنتجات والبيانات كاملة.
          </CardContent>
        </Card>
      )}

      {submittedCode && isLoading && (
        <Card>
          <CardContent className="py-10 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            جارٍ تحميل بيانات الطلب...
          </CardContent>
        </Card>
      )}

      {submittedCode && !isLoading && !order && error && (
        <Card>
          <CardContent className="py-8 text-center text-red-300">{errorMessage}</CardContent>
        </Card>
      )}

      {order && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center justify-between gap-3 text-white">
                  <span>طلب رقم #{order.id}</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusClasses[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoRow label="كود التتبع" value={order.tracking_code} />
                <InfoRow
                  label="تاريخ الطلب"
                  value={new Date(order.created_at).toLocaleString("ar-EG")}
                />
                <InfoRow label="الحالة" value={statusLabels[order.status]} />
                <InfoRow label="ملاحظات" value={order.notes} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Truck className="w-5 h-5 text-primary" />
                  المنتجات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-border/40 pb-4 last:border-none last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveImage(item.cover_image)}
                        alt={item.product_name}
                        className="w-14 h-14 object-cover rounded bg-accent"
                      />
                      <div>
                        <p className="font-medium text-foreground">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-sm text-left">
                      <p className="text-muted-foreground">سعر الوحدة: {Number(item.price).toFixed(2)} ج.م</p>
                      <p className="font-semibold text-primary">الإجمالي: {item.line_total.toFixed(2)} ج.م</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">بيانات العميل</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="الاسم" value={order.customer_name} />
                <InfoRow label="رقم الهاتف" value={order.customer_phone} />
                <InfoRow label="البريد الإلكتروني" value={order.customer_email} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-white">عنوان التوصيل</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="المدينة" value={order.city} />
                <InfoRow label="العنوان" value={order.address} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarClock className="w-5 h-5 text-primary" />
                  ملخص الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي</span>
                  <span>{order.subtotal.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>الشحن</span>
                  <span>{order.shipping_cost.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>رسوم إضافية</span>
                  <span>{order.fees_cost.toFixed(2)} ج.م</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                  <span>الإجمالي</span>
                  <span className="text-primary">{order.total.toFixed(2)} ج.م</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-muted-foreground">جارٍ التحميل...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
