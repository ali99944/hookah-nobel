"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCartIcon, ChevronRight, Minus, Plus } from "lucide-react"
import useProducts from "@/features/products/hooks/use-products"
import Link from "next/link"
import { useCart } from "@/features/cart/hooks/use-cart"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data } = useProducts()
  const { add } = useCart()

  const productId = Number.parseInt(params.id as string)
  const product = (data?.data ?? []).find((p) => p.id === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">المنتج غير موجود</h2>
          <Button onClick={() => router.push("/products")}>العودة إلى المنتجات</Button>
        </div>
      </div>
    )
  }

  const allImages = [product.image, ...product.gallery.map((g) => g.source)]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      add(product)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary transition-colors">
            المنتجات
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-secondary rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
              <img
                src={allImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="max-h-96 object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 bg-secondary rounded-xl p-3 border-2 transition-all ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-20 h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-accent mb-3">{product.collection.name}</Badge>
              <h1 className="text-xl lg:text-2xl font-bold text-primary">{product.name} - {product.price} LE</h1>
            </div>

            {product.description && (
              <div>
                {/* <h3 className="text-lg font-semibold text-foreground mb-2">الوصف</h3> */}
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.features && Object.keys(product.features).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">المواصفات</h3>
                <div className="space-y-3">
                  {Object.entries(product.features).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 px-4 bg-secondary rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-primary">{key}</span>
                      <span className="font-semibold text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {product.stock !== undefined && (
              <div>
                <span className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-destructive"}`}>
                  {product.stock > 0 ? `متوفر في المخزون (${product.stock})` : "غير متوفر"}
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">الكمية</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-accent rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCartIcon className="w-5 h-5 ml-2" />
                أضف إلى السلة
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  handleAddToCart()
                  router.push("/cart")
                }}
                disabled={product.stock === 0}
              >
                اشتر الآن
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Section - Optional for future */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">منتجات ذات صلة</h2>
        </div> */}
      </div>
    </div>
  )
}
