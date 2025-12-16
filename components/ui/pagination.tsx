"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

interface PaginationSlotProps {
  value: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
}

function PaginationSlot({ value, isActive, onClick, disabled }: PaginationSlotProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                cursor-pointer w-8 h-8 rounded bg-accent 
                ${isActive ? "bg-primary hover:bg-primary/90 text-black font-bold" : "hover:bg-accent/80 text-black"} 
                ${disabled ? "opacity-50 cursor-not-allowed!" : ""}
                transition-all duration-200 flex items-center justify-center
            `}
    >
      {value}
    </button>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    // Always show last page
    pages.push(totalPages)

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center gap-2">
      <PaginationSlot
        value={<ChevronRight className="w-4 h-4" />}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <PaginationSlot
            key={`page-${page}`}
            value={page.toString()}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ) : (
          <span key={`ellipsis-${index}`} className="text-muted-foreground px-1">
            {page}
          </span>
        ),
      )}
      <PaginationSlot
        value={<ChevronLeft className="w-4 h-4" />}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

export default Pagination
