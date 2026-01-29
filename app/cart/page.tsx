"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DangerDialog } from "@/components/ui/dialog" // Adjust path as needed
import { useCart } from "@/features/cart/hooks/use-cart"

export default function CartPage() {
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const { items, removeItem, updateQuantity, isLoading, clearCart, isMutating } = useCart({
    delete_cart_item_id: itemToDelete as number | undefined
  })

  // --- LOCAL STATE FOR DIALOGS ---
  const [isClearCartOpen, setIsClearCartOpen] = useState(false)

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const shipping = 0
    const total = subtotal + shipping

    return { subtotal, shipping, total }
  }, [items])

  // --- HANDLERS ---
  const handleDeleteItem = () => {
    if (itemToDelete) {
      removeItem()
      setItemToDelete(null)
    }
  }

  const handleClearCart = () => {
    clearCart()
    setIsClearCartOpen(false)
  }

  // --- LOADING VIEW ---
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="bg-secondary p-4 rounded-2xl mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32 rounded-full!" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-0">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <Skeleton className="h-6 w-24 bg-secondary/50" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                  <div className="flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-16" /></div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between"><Skeleton className="h-6 w-24" /><Skeleton className="h-6 w-20" /></div>
                </div>
                <div className="flex gap-4">
                   <Skeleton className="h-12 flex-1 rounded-md" />
                   <Skeleton className="h-12 flex-1 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // --- EMPTY CART VIEW ---
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

  // --- MAIN VIEW ---
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-secondary p-3 rounded-2xl mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">سلة التسوق</h1>

        <Button
          variant='destructive'
          onClick={() => setIsClearCartOpen(true)}
          disabled={isMutating}
        >
          {
            isMutating ? 
              <Loader2 className="w-4 h-4 mr-2 animate-spin duration-300" /> :
              <Trash2 className="w-4 h-4 mr-2" />
          }
          افراغ السلة
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-0">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-accent rounded-lg flex items-center justify-center shrink-0">
                    <img src={item.product.image || "/placeholder.svg"} alt={item.product.name} className="w-20 h-20 object-contain" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-foreground font-bold text-lg">{item.product.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.product.collection?.name}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon-sm"
                          variant="accent"
                          onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                          disabled={isMutating}
                          className="rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-foreground font-bold min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          size="icon-sm"
                          variant="accent"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={isMutating}
                          className="rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-primary font-bold text-lg">{item.product.price * item.quantity} ج.م</p>
                        <Button
                          size="icon-sm"
                          variant="destructive"
                          onClick={() => setItemToDelete(item.product_id)}
                          disabled={isMutating}
                          className="text-white hover:bg-destructive/85"
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
                <span>{totals.subtotal.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>الشحن</span>
                <span>{totals.shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-bold text-xl">
                  <span>الإجمالي</span>
                  <span className="text-primary text-md">{totals.total.toFixed(2)} ج.م</span>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <Link href="/checkout" className="block flex-1">
                  <Button size="lg" className="bg-primary text-black hover:bg-primary/90 w-full" disabled={isMutating}>
                    إتمام الطلب
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>

                <Link href="/products" className="flex-1">
                  <Button size="lg" variant="accent" className=" w-full">
                    متابعة التسوق
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- DIALOGS --- */}
      
      {/* 1. Delete Single Item Dialog */}
      <DangerDialog 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteItem}
        title="حذف المنتج؟"
        description="هل أنت متأكد من رغبتك في حذف هذا المنتج من سلة التسوق؟"
        isLoading={isMutating} 
      />

      {/* 2. Clear Cart Dialog */}
      <DangerDialog 
        isOpen={isClearCartOpen}
        onClose={() => setIsClearCartOpen(false)}
        onConfirm={handleClearCart}
        title="إفراغ سلة التسوق؟"
        description="سيتم حذف جميع المنتجات الموجودة في السلة. هل أنت متأكد؟"
        isLoading={isMutating} 
      />

    </div>
  )
}