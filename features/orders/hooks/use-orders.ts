import { useGetQuery, useMutationAction } from "@/core/hooks/queries-actions";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
  Order,
} from "@/features/orders/types";

export const useCreateOrder = () => {
  return useMutationAction<CreateOrderResponse, CreateOrderPayload>({
    method: "post",
    url: "/orders",
    key: ["cart"],
  });
};

export const useTrackOrder = (trackingCode: string) => {
  return useGetQuery<{ data: Order }>({
    key: ["order-track", trackingCode],
    url: `/orders/track/${encodeURIComponent(trackingCode)}`,
    options: {
      enabled: Boolean(trackingCode),
      retry: false,
    },
  });
};
