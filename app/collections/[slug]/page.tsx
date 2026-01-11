"use client"

import Link from "next/link"
import { ArrowRight, PackageX, Search } from "lucide-react"
import { useParams } from "next/navigation"
import useProducts from "@/features/products/hooks/use-products"
import type { Product } from "@/features/products/types/product"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/core/hooks/use-notification"
import { ShoppingCartIcon } from "lucide-react"
import { useCategories } from "@/features/categories/hooks/category.hook"
import Input from "@/components/ui/input"
import { useState } from "react"
import { useCart } from "@/features/cart/hooks/use-cart"

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const { notify } = useNotification()
  const [isAdding, setIsAdding] = useState(false)

  const addToCart = async () => {
    try {
      setIsAdding(true)
      add(product)
      notify.success("تم اضافة المنتج الي السلة")
    } catch (error) {
      notify.error("حدث خطأ أثناء إضافة المنتج")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-card rounded-2xl overflow-hidden relative hover:shadow-lg transition-shadow duration-300">
        <div className="w-full flex justify-center items-center relative">
          <img
            src={product.image || "/images/product-placeholder.png"}
            className="aspect-square w-full object-cover object-top"
            alt={product.name}
          />

          <div className="absolute top-2 left-2">
            <Button
              className="w-auto h-6 text-xs"
              disabled={isAdding}
              onClick={(e) => {
                e.preventDefault()
                addToCart()
              }}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>اضافة للسلة</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-end p-3">
          <div className="flex flex-col">
            <p className="text-foreground text-sm font-medium">{product.name}</p>
            <p className="text-primary font-bold text-md">{product.price} ج.م</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

function LoadingProductSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square w-full bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-white/10 rounded w-24" />
        <div className="h-5 bg-white/10 rounded w-16" />
      </div>
    </div>
  )
}

function CollectionDetailPage() {
  const { slug } = useParams()
  const { data: categories = [], isFetching: is_categories_loading } = useCategories()
  const { data: result } = useProducts()
  const allProducts = result?.data ?? []

  const collection = categories.find((cat) => cat.slug === slug)
  const products = collection ? allProducts.filter((p) => p.category.id === collection.id) : []

  const [searchTerm, setSearchTerm] = useState("")

  if (is_categories_loading) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="space-y-6 mb-12 animate-pulse">
          <div className="h-10 bg-white/10 rounded-lg w-32" />
          <div className="h-12 bg-white/10 rounded-lg w-64" />
          <div className="h-5 bg-white/10 rounded w-96" />
        </div>

        {/* Collection image skeleton */}
        <div className="w-full h-96 bg-white/10 rounded-2xl mb-12 animate-pulse" />

        {/* Products grid skeleton */}
        <div className="space-y-4 mb-8 animate-pulse">
          <div className="h-6 bg-white/10 rounded w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <LoadingProductSkeleton key={item} />
          ))}
        </div>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-secondary rounded-full p-8 mb-6">
            <PackageX className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">المجموعة غير موجودة</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">عذراً، المجموعة التي تبحث عنها غير متاحة حالياً</p>
          <Link href="/collections">
            <Button variant="accent" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة إلى المجموعات
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى المجموعات</span>
      </Link>

      {/* Collection Header Section */}
      {/* <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-white/5">
          <img
            src={collection.image || "/images/category-placeholder-2.png"}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        </div> */}

      <div className="flex justify-between items-center bg-secondary p-3 rounded-full">
        <span className="text-foreground font-bold">{collection.name}</span>
        <div>
          <Input
            className="w-48 md:w-60 lg:w-72 xl:w-80 bg-accent"
            placeholder="ابحث عن منتجات"
            startIcon={<Search />}
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-8 mt-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-secondary rounded-full p-8 mb-6">
              <PackageX className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">لا توجد منتجات حالياً</h3>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              عذراً، هذه المجموعة لا تحتوي على أي منتجات متاحة في الوقت الحالي
            </p>
            <Link href="/collections">
              <Button variant="accent" className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                تصفح مجموعات أخرى
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionDetailPage
