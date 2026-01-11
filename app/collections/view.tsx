"use client"

import Link from "next/link"
import type { Category } from "@/features/categories/types/category"
import { useCategories } from "@/features/categories/hooks/category.hook"

function CollectionsPage() {
  const { data: categories = [], isFetching: is_categories_loading } = useCategories()

  if (is_categories_loading) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-2 mb-12 animate-pulse">
          <div className="h-10 bg-white/10 rounded-lg w-64 mb-2" />
          <div className="h-5 bg-white/10 rounded w-96" />
        </div>

        {/* Skeleton for collections grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex flex-col items-center space-y-4 animate-pulse">
              <div className="aspect-square w-full rounded-2xl bg-white/10" />
              <div className="h-6 bg-white/10 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center space-y-3 mb-12">
        <h1 className="text-primary text-3xl md:text-5xl font-bold text-center font-cairo">كل مجموعات نوبل</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">اكتشف جميع مجموعاتنا واختر ما يناسبك</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-md:gap-x-4 max-md:gap-y-8 gap-x-8 gap-y-18">
        {categories.map((cat) => (
          <CollectionCard key={cat.id} category={cat} />
        ))}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">لا توجد مجموعات متاحة</p>
        </div>
      )}
    </div>
  )
}

function CollectionCard({ category }: { category: Category }) {
  return (
    <Link href={`/collections/${category.slug}`} className="group flex flex-col items-center gap-4">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-10" />

        <img
          src={category.image || "/images/category-placeholder-2.png"}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-2 right-2 z-20 bg-accent backdrop-blur-sm text-accent-foreground w-auto px-2 h-6 flex items-center justify-center font-bold rounded-full text-[10px]">
            {category.products_count ?? 0} منتجات
          </div>

      </div>

      {/* Title */}
      <h3 className="text-foreground text-sm font-bold group-hover:text-primary transition-colors duration-200 text-center">
        {category.name}
      </h3>
    </Link>
  )
}

export default CollectionsPage
