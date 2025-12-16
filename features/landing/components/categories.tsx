import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Category {
  id: number
  name: string
  description?: string
  image: string
  productsCount?: number
}

const categories: Category[] = [
  {
    id: 1,
    name: "شيشة بلدي",
    description: "أنضف شيشة بلدي",
    image: "/images/box.png",
    productsCount: 24,
  },
  {
    id: 2,
    name: "معسلات فاخرة",
    description: "أجود أنواع المعسل",
    image: "/images/box.png",
    productsCount: 36,
  },
  {
    id: 3,
    name: "فحم طبيعي",
    description: "فحم بجودة عالية",
    image: "/images/box.png",
    productsCount: 18,
  },
  {
    id: 4,
    name: "إكسسوارات",
    description: "جميع مستلزمات الشيشة",
    image: "/images/box.png",
    productsCount: 42,
  },
]

function Categories() {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center space-y-2 mb-12">
        <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold text-center">أقسامنا المميزة</h2>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          اكتشف مجموعتنا الواسعة من المنتجات الفاخرة
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.id}`} className="group">
      <Card className="p-0 gap-0 overflow-hidden transition-all duration-300 ">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="h-56 w-full object-cover  transition-transform duration-300"
          />
          {category.productsCount && (
            <div className="absolute top-3 right-3 z-20 bg-primary text-black px-3 py-1 rounded-full text-xs font-bold">
              {category.productsCount} منتج
            </div>
          )}
        </div>
        <CardContent className="p-6 flex flex-col items-center text-center relative">
          <h3 className="text-foreground text-lg font-bold mb-2">{category.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
          <div className="flex items-center gap-2 text-primary transition-all duration-300">
            <span className="text-sm font-semibold">تصفح الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default Categories
