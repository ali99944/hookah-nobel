"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import Input from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }

  return (
    <div className="bg-card rounded-2xl p-6 ">
      <h2 className="text-2xl text-primary mb-6">أرسل رسالتك</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              الاسم الكامل
            </label>
            <Input id="name" placeholder="أدخل اسمك" required className="bg-background" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              البريد الإلكتروني
            </label>
            <Input id="email" type="email" placeholder="example@email.com" required className="bg-background" />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            الموضوع
          </label>
          <Input id="subject" placeholder="موضوع الرسالة" required className="bg-background" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            الرسالة
          </label>
          <Textarea
            id="message"
            placeholder="اكتب رسالتك هنا..."
            rows={8}
            required
            className="bg-background resize-none h-40"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full ">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 ml-2" />
              إرسال الرسالة
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
