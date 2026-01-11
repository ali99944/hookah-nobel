// import type { Product } from "@/features/products/types/product"
// import { create } from "zustand"

// interface CartItem extends Product {
//   quantity: number
// }

// interface CartState {
//   items: CartItem[]

//   add: (product: Product) => void
//   removeItem: (productId: number) => void
//   updateQuantity: (productId: number, quantity: number) => void
//   clearCart: () => void
// }

// const useCart = create<CartState>((set) => ({
//   items: [],

//   add: (product: Product) =>
//     set((state) => {
//       // Check if product already exists in cart
//       const existingItem = state.items.find((item) => item.id === product.id)

//       if (existingItem) {
//         // Increase quantity if already in cart
//         return {
//           items: state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
//         }
//       }

//       // Add new item with quantity 1
//       return {
//         items: [...state.items, { ...product, quantity: 1 }],
//       }
//     }),

//   removeItem: (productId: number) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.id !== productId),
//     })),

//   updateQuantity: (productId: number, quantity: number) =>
//     set((state) => ({
//       items: state.items.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)),
//     })),

//   clearCart: () => set({ items: [] }),
// }))

// export { useCart }
