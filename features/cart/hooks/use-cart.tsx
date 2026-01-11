import { useGetQuery, useMutationAction } from "@/core/hooks/queries-actions";
import { CartResponse, AddToCartPayload } from "../types";
import { Product } from "@/features/products/types/product";
import { useQueryClient } from "@tanstack/react-query";

// 1. Hook to Fetch Cart
export const useGetCart = () => {
  return useGetQuery<CartResponse>({
    key: ["cart"],
    url: "/cart",
    onErrorCallback(error) {
        console.log(error);
    },
  });
};

// 2. Hook to Add to Cart
export const useAddToCart = () => {
    const queryClient = useQueryClient()

    return useMutationAction<unknown, AddToCartPayload>({
        method: "post",
        url: "/cart",
        key: ["add-cart"], 
        onSuccessCallback(data) {
            console.log(data);
            
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
    });
};

// 3. Hook to Update Quantity
export const useUpdateCartQuantity = (cart_item_id: number | undefined) => {
  return useMutationAction({
    method: "put",
    url: `/cart/items/${cart_item_id}`,
    key: ["update-cart-quantity"],
  });
};

// 4. Hook to Remove Item
export const useRemoveFromCart = (cart_item_id: number | undefined) => {
  return useMutationAction({
    method: "delete", 
    url: `/cart/items/${cart_item_id}`, // Verify this with your backend route
    key: ["remove-cart-item"],
  });
};

// 5. Hook to Clear Cart
export const useClearCart = () => {
    const queryClient = useQueryClient()

    return useMutationAction<void, void>({
        method: "post",
        url: "/cart/clear",
        key: ["clear-cart"],
        onSuccessCallback() {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
    });
};

// --- COMPOSITE HOOK (The replacement for useCart) ---

interface CartProps {
    delete_cart_item_id?: number
    update_cart_item_id?: number
}

export const useCart = (data?: CartProps) => {
  const { data: cartData, isLoading } = useGetCart();
  
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartQuantity(data?.update_cart_item_id);
  const removeMutation = useRemoveFromCart(data?.delete_cart_item_id);
  const clearMutation = useClearCart();

  const items = cartData?.data || [];

  // Helper: Add Logic
  const add = (product: Product, quantity = 1) => {
    // Check if item exists locally to decide if we Update or Add
    const existingItem = items.find((item) => item.product_id === product.id);

    if (existingItem) {
      updateMutation.mutate({
        product_id: product.id,
        quantity: existingItem.quantity + quantity,
      });
    } else {
      addMutation.mutate({
        product_id: product.id,
        quantity: quantity,
      });
    }
  };

  // Helper: Remove Logic
  const removeItem = () => {
    removeMutation.mutate({}) 
  };

  // Helper: Update Logic
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    updateMutation.mutate({ product_id: productId, quantity });
  };

  return {
    items,
    isLoading,
    isMutating: addMutation.isPending || updateMutation.isPending || removeMutation.isPending,
    
    add,
    removeItem,
    updateQuantity,
    clearCart: () => clearMutation.mutate(),
    
    // Expose totals if API sends them
    totalPrice: cartData?.meta?.total_price || 0,
    totalCount: cartData?.meta?.count || items.length,
  };
};