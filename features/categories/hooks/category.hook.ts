import { useGetQuery } from "@/core/hooks/queries-actions"
import { Collection } from "../types/category"
import { RequestFilter } from "@/core/types/request_filter"

export const useCollections = (filter?: RequestFilter) => {
    let url: string = 'collections'

    if(filter?.limit) {
        url = `collections?limit=${filter?.limit}`
    }

    return useGetQuery<Collection[]>({
        url, key: ['collections']
    })
}