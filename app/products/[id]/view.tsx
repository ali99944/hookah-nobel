"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotification } from "@/core/hooks/use-notification"
import { getStorageLink } from "@/core/lib/storage"
import { useCart } from "@/features/cart/hooks/use-cart"
import type { Product, ProductKeyValueItem } from "@/features/products/types/product"
import { ArrowRight, ChevronRight, Minus, Plus, ShoppingCartIcon } from "lucide-react"

interface ProductDetailsPageProps {
  product: Product
}

type ProductDetailsSource = Product["attributes"] | Product["features"]

const toImageSrc = (image: string | null | undefined): string => {
  if (!image) {
    return "/images/product-placeholder.png"
  }

  if (/^https?:\/\//i.test(image)) {
    return image
  }

  return getStorageLink(image) || "/images/product-placeholder.png"
}

const normalizeDetails = (source: ProductDetailsSource): ProductKeyValueItem[] => {
  if (!source) {
    return []
  }

  if (Array.isArray(source)) {
    return source
      .map((item) => ({
        id: item?.id,
        key: String(item?.key ?? "").trim(),
        value: String(item?.value ?? "").trim(),
      }))
      .filter((item) => item.key && item.value)
  }

  return Object.entries(source)
    .map(([key, value]) => ({ key: String(key).trim(), value: String(value ?? "").trim() }))
    .filter((item) => item.key && item.value)
}

const formatPrice = (price: number): string => `${price.toLocaleString("en-US")} ج.م`

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const router = useRouter()
  const { add } = useCart()
  const { notify } = useNotification()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = useMemo(() => {
    const cover = product.cover_image ? [product.cover_image] : []
    const gallery = (product.gallery ?? [])
      .map((image) => image.source || image.url || "")
      .filter(Boolean)
    const uniqueImages = Array.from(new Set([...cover, ...gallery]))
    return uniqueImages.length > 0 ? uniqueImages : ["/placeholder.svg"]
  }, [product.cover_image, product.gallery])

  const attributes = useMemo(() => normalizeDetails(product.attributes), [product.attributes])
  const features = useMemo(() => normalizeDetails(product.features), [product.features])


  const addToCart = (goToCart = false) => {
    for (let i = 0; i < quantity; i += 1) {
      add(product)
    }

    notify.success("تم اضافة المنتج الي السلة")

    if (goToCart) {
      router.push("/cart")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-secondary rounded-2xl p-3 md:p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary transition-colors">
            المنتجات
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[180px] md:max-w-[320px]">{product.name}</span>
        </div>

        <Link href="/products" className="inline-flex">
          <Button variant="accent" size="sm">
            <ArrowRight className="w-4 h-4" />
            متابعة التسوق
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-card aspect-square w-full flex items-center justify-center p-6 md:p-10">
                <img
                  src={toImageSrc(images[selectedImage])}
                  alt={product.name}
                  className="max-h-[540px] h-full w-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-card border transition-colors flex-shrink-0 ${
                    selectedImage === index ? "border-primary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img
                    src={toImageSrc(image)}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <Card className="sticky top-24 gap-4">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between gap-3">
                <Badge className="bg-accent text-accent-foreground">
                  {product.collection?.name || "منتج"}
                </Badge>
              </div>
              <CardTitle className="text-lg md:text-xl font-bold leading-tight">
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-end justify-between">
                <p className="text-primary text-2xl md:text-3xl font-extrabold">
                  {formatPrice(product.price)}
                </p>
                <span className="text-xs text-muted-foreground">رقم المنتج: #{product.id}</span>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              )}

              <div className="bg-secondary rounded-2xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">الكمية</p>
                  <p className="text-xs text-muted-foreground">اختر الكمية المناسبة قبل الإضافة</p>
                </div>

                <div className="inline-flex items-center bg-accent rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full text-black/80 hover:text-black!"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-black">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Plus className="w-4 h-4 text-black/80 hover:text-black!" />
                  </Button>
                </div>
              </div>

              <div className="bg-secondary rounded-2xl p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">الإجمالي</span>
                <span className="text-lg font-bold text-primary">{formatPrice(product.price * quantity)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button size="lg" onClick={() => addToCart(false)}>
                  <ShoppingCartIcon className="w-5 h-5" />
                  أضف إلى السلة
                </Button>

                <Button
                  size="lg"
                  variant="accent"
                  onClick={() => addToCart(true)}
                >
                  شراء الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {attributes.length > 0 && (
          <Card className="gap-4">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">المواصفات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {attributes.map((item, index) => (
                <div
                  key={`${item.id ?? "attr"}-${item.key}-${index}`}
                  className="bg-secondary rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-semibold text-primary">{item.key}</span>
                  <span className="text-sm text-muted-foreground text-end">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {features.length > 0 && (
          <Card className="gap-4">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">المميزات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {features.map((item, index) => (
                <div
                  key={`${item.id ?? "feat"}-${item.key}-${index}`}
                  className="bg-secondary rounded-xl px-4 py-3"
                >
                  <p className="text-sm font-semibold text-primary">{item.key}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
