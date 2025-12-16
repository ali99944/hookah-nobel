import { MessageCircle } from "lucide-react"
import Link from "next/link"

function FloatingWhatsapp() {
  return (
    <>
        <div className="fixed bottom-4 right-4">
            <Link href={'wa.me'} target="_blank">
                <div className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 cursor-pointer transition-colors duration-300">
                    <MessageCircle />
                </div>
            </Link>
        </div>
    </>
  )
}

export default FloatingWhatsapp