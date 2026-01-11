"use client"

import { usePolicyByKey } from "@/features/policies/hooks/use-policies"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

export default function PolicyPage() {
  const params = useParams()
  const key = params.key as string
  const { data: policy, isLoading, error } = usePolicyByKey(key)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Skeleton Loader */}
          <div className="space-y-8">
            <div className="h-12 bg-neutral-800 rounded-lg animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">السياسة غير موجودة</h1>
          <p className="text-gray-400 mb-8">عذراً، لم نتمكن من العثور على السياسة المطلوبة</p>
          <Link href="/">
            <Button>
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Format the updatedAt date
  const formattedDate = policy.updated_at ? format(new Date(policy.updated_at), "d MMMM yyyy", { locale: ar }) : ""

  return (
    <div className="min-h-screen bg-neutral-950 pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 bg-accent p-3 rounded-2xl">
          <h1 className="text-accent-foreground text-2xl">{policy.name}</h1>

          {/* <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{policy.title}</h1> */}

          {/* Updated Date */}
          <div className="flex items-center gap-2 text-black/80">
            <Calendar className="w-4 h-4" />
            <span>آخر تحديث: {formattedDate}</span>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="h-px bg-border/10 mb-8"></div> */}

        {/* Content */}
        <div className="prose prose-invert max-w-none bg-secondary p-4 rounded-2xl">
          <div
            className="text-gray-300 leading-relaxed space-y-6 text-lg"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        </div>

      </div>
    </div>
  )
}
