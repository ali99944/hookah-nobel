import type { Collection } from "@/features/categories/types/category"

export interface ProductGalleryImage {
  id: number
  source?: string
  url?: string
}

export interface ProductKeyValueItem {
  id?: number
  key: string
  value: string
}

export interface Product {
  id: number
  name: string
  cover_image: string | null
  price: number
  description?: string | null
  status?: string
  is_active?: boolean
  collection_id?: number
  attributes?: ProductKeyValueItem[] | Record<string, string>
  features?: ProductKeyValueItem[] | Record<string, string>
  collection: Collection
  gallery: ProductGalleryImage[]
}
