import { WithPagination } from "@/core/types/pagination"
import type { Product } from "../types/product"
import { useGetQuery } from "@/core/hooks/queries-actions"

function useProducts() {
  return useGetQuery<WithPagination<Product[]>>({
    url: "products",
    key: ["products"],
  })
}

export const useGetProductsByCategory = (category_id: number) => {
    return useGetQuery<Product[]>({
        url: `categories/${category_id}/products`,
        key: ['products']
    })
}

export default useProducts
