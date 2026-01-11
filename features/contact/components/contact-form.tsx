"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2, LetterTextIcon, MailIcon, NotepadTextIcon } from "lucide-react"
import Input from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateContactRequest } from "../hooks/use-contact-request"
import { ConfirmDialog } from "@/components/ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react"
import { ApiError } from "next/dist/server/api-utils"
import { useNotification } from "@/core/hooks/use-notification"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const { mutateAsync: createContactRequest } = useCreateContactRequest()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
  }

  const { notify } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    }

    await createContactRequest(payload, {
      onSuccess: () => {
        resetForm()
        setIsSubmitting(false)
        notify.success('تم ارسال الرسالة بنجاح')
      },
      onError: (error) => {
        setIsSubmitting(false)
        notify.error(error.response?.data.message || 'حدث خطأ')
      }
    })
  }

  return (
    <>
      <div className="bg-card rounded-2xl p-6">
        <h2 className="text-2xl text-primary mb-6">أرسل رسالتك</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                الاسم الكامل
              </label>
              <Input 
                startIcon={<LetterTextIcon className="w-5 h-5" />} 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="أدخل اسمك" 
                required 
                disabled={isSubmitting}
                className="bg-background" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                البريد الإلكتروني
              </label>
              <Input 
                startIcon={<MailIcon className="w-5 h-5" />} 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com" 
                required 
                disabled={isSubmitting}
                className="bg-background" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
              الموضوع
            </label>
            <Input 
              startIcon={<LetterTextIcon className="w-5 h-5" />} 
              id="subject" 
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="موضوع الرسالة" 
              required 
              disabled={isSubmitting}
              className="bg-background" 
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <NotepadTextIcon className="w-5 h-5" />
              الرسالة
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="اكتب رسالتك هنا..."
              rows={8}
              required
              disabled={isSubmitting}
              className="bg-background resize-none h-40"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
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
    </>
  )
}