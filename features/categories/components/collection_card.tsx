import Link from "next/link";
import { Collection } from "../types/category";
import { getStorageLink } from "@/core/lib/storage";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group flex flex-col items-center gap-4">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-10" />
        
        <img
          src={getStorageLink(collection.image) || "/images/category-placeholder-2.png"}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="text-foreground text-sm font-bold group-hover:text-primary transition-colors duration-200 text-center">
        {collection.name}
      </h3>
    </Link>
  )
}