import type { Category } from "@/features/categories/types/category"

export interface ProductGalleryImage {
  id: number
  source: string
}

export interface Product {
  id: number
  name: string
  image: string
  price: number
  description?: string
  stock?: number
  is_active?: boolean
  features?: Record<string, string> // Key-value pairs like { "الوزن": "1 كجم", "الارتفاع": "70 سم" }

  category: Category
  gallery: ProductGalleryImage[]
}
