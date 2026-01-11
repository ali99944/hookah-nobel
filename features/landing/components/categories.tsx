'use client'

import Link from "next/link"
import { ArrowLeft } from "lucide-react" // Assuming you have lucide-react, standard in shadcn/ui
import { useCategories } from "@/features/categories/hooks/category.hook"
import { Category } from "@/features/categories/types/category"
import { Button } from "@/components/ui/button" // Assuming you have a Button component

function Collections() {
  const { data: categories = [], isFetching: is_categories_loading } = useCategories({
    limit: 5
  })

  if (is_categories_loading) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-2 mb-12 animate-pulse">
          <div className="h-10 bg-white/10 rounded-lg w-64 mb-2" />
          <div className="h-5 bg-white/10 rounded w-96" />
        </div>

        {/* Skeleton for 5 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
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
        <h2 className="text-primary text-3xl md:text-4xl font-bold text-center font-cairo">
          تصفح المجموعات
        </h2>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          تسوق حسب القسم المفضل لديك
        </p>
      </div>

      {/* Grid - 5 Columns on LG to fit the limit perfectly */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {categories.map((cat) => (
          <CollectionCard key={cat.id} category={cat} />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <Link href="/collections">
          <Button variant="accent" size="lg" >
            عرض كل المجموعات
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>
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
          className="h-full w-full object-cover transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="text-foreground text-md font-bold group-hover:text-primary transition-colors duration-200 text-center">
        {category.name}
      </h3>
    </Link>
  )
}

export default Collections