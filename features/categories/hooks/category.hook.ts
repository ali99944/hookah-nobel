import { useGetQuery } from "@/core/hooks/queries-actions"
import { Category } from "../types/category"
import { RequestFilter } from "@/core/types/request_filter"

export const useCategories = (filter?: RequestFilter) => {
    let url: string = 'categories'

    if(filter?.limit) {
        url = `categories?limit=${filter?.limit}`
    }

    return useGetQuery<Category[]>({
        url, key: ['categories']
    })
}