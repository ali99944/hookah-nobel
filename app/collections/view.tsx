"use client"

import { useCollections } from "@/features/categories/hooks/category.hook"
import { CollectionCard } from "@/features/categories/components/collection_card"

function CollectionsPage() {
  const { data: collections = [], isFetching: is_collections_loading } = useCollections()

  if (is_collections_loading) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-2 mb-12 animate-pulse">
          <div className="h-10 bg-white/10 rounded-lg w-64 mb-2" />
          <div className="h-5 bg-white/10 rounded w-96" />
        </div>

        {/* Skeleton for collections grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-md:gap-x-4 max-md:gap-y-8 gap-x-8 gap-y-18">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>

      {/* Empty state */}
      {collections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">لا توجد مجموعات متاحة</p>
        </div>
      )}
    </div>
  )
}

export default CollectionsPage
