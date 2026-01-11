import { useMutationAction } from "@/core/hooks/queries-actions"

export const useCreateContactRequest = () => {
    return useMutationAction({
        method: "post",
        url: "contact-requests"
    })
}