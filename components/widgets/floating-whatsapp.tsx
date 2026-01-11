'use client'

import { useSettings } from "@/features/settings/hooks/use-settings"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

function FloatingWhatsapp() {
  const { data: settings, isFetching: is_settings_loading } = useSettings()

  if(is_settings_loading) {
    return null
  }

  return (
    <>
        <div className="fixed bottom-4 right-4">
            <Link href={`wa.me/${settings?.contact_info.whatsapp_number}`} target="_blank">
                <div className="bg-success hover:bg-success/80 rounded-full p-3 cursor-pointer transition-colors duration-300">
                    <MessageCircle />
                </div>
            </Link>
        </div>
    </>
  )
}

export default FloatingWhatsapp