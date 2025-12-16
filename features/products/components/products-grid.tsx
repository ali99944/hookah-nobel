"use client"

import Input from "@/components/ui/input"
import { Filter, Search, ShoppingCartIcon, PackageX } from "lucide-react"
import type { Product } from "../types/product"
import useProducts from "../hooks/use-products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/core/hooks/use-cart"
import { useMemo, useState } from "react"
import Pagination from "@/components/ui/pagination"
import Link from "next/link"

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const addToCart = () => {
    add(product)
  }

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-card rounded-2xl p-3 relative hover:shadow-lg transition-shadow duration-300">
        <div className="absolute top-2 right-2">
          <Badge className="bg-accent font-bold uppercase">{product.category.name}</Badge>
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            src={product.image || "/placeholder.svg"}
            className="h-32 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-foreground">{product.name}</p>
            <p className="text-muted-foreground">{product.price}$</p>
          </div>

          <Button
            className="w-8 h-8"
            onClick={(e) => {
              e.preventDefault()
              addToCart()
            }}
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

const ProductsGrid = () => {
  const { products } = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [products, searchTerm])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-secondary p-3 rounded-full">
        <div>
          <Input
            className="min-w-80 bg-accent"
            placeholder="ابحث عن منتجات"
            startIcon={<Search />}
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </div>

        <Button className="" variant="secondary">
          الفئة
          <Filter />
        </Button>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-secondary rounded-full p-8 mb-6">
            <PackageX className="w-16 h-16 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">لا توجد منتجات</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchTerm ? `لم نتمكن من العثور على أي منتجات تطابق "${searchTerm}"` : "لا توجد منتجات متاحة حالياً"}
          </p>
          {searchTerm && (
            <Button onClick={() => setSearchTerm("")} variant="outline">
              مسح البحث
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedProducts.map((pr) => (
              <ProductCard product={pr} key={pr.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </div>
  )
}

export default ProductsGrid
