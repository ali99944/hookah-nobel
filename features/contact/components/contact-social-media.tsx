import { Facebook, Instagram, LucideIcon, Twitch, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

interface Social {
    id: number
    name: string
    icon: LucideIcon
}

const socials: Social[] = [
    {
        id: 1,
        name: 'Instagram',
        icon: Instagram
    },
    {
        id: 2,
        name: 'Facebook',
        icon: Facebook
    },
    {
        id: 3,
        name: 'Youtube',
        icon: Youtube
    },
    {
        id: 4,
        name: 'Twitter',
        icon: Twitter
    },
    {
        id: 5,
        name: 'Twitch',
        icon: Twitch
    },
]

function SocialIcon({ social }: { social: Social }) {
    const Icon = social.icon

    return (
        <Link href={'/'} className="group">
            <div className="flex flex-col items-center">
                <div className="p-3 bg-accent group-hover:bg-accent/80 transition-all duration-300 rounded-full mb-2">
                    <Icon className="text-black"/>
                </div>
                <span className="text-foreground text-sm">{social.name}</span>
            </div>
        </Link>
    )
}

function ContactSocialMedia() {
  return (
    <div className="bg-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-12">
            {
                socials.map(soc => <SocialIcon key={soc.id} social={soc} />)
            }
        </div>
    </div>
  )
}

export default ContactSocialMedia