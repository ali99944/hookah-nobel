import { WithPagination } from "@/core/types/pagination"
import type { Product } from "../types/product"
import { useGetQuery } from "@/core/hooks/queries-actions"

function useProducts() {
  return useGetQuery<WithPagination<Product[]>>({
    url: "products",
    key: ["products"],
  })
}

export const useGetProductsByCollection = (collection_id: number) => {
    return useGetQuery<Product[]>({
        url: `collections/${collection_id}/products`,
        key: ['products']
    })
}

export default useProducts
