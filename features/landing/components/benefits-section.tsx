import { Box, CardSim, Handshake, Heart, LucideIcon, Send, ShieldCheck, Users, Users2 } from "lucide-react"
import { FC } from "react"

interface Benefit {
  id: number
  name: string
  description?: string
  icon: LucideIcon
}

const benefits: Benefit[] = [
  // kept only the 4 most important benefits
  {
    id: 1,
    name: "جودة تفرق",
    description: "منتجات مختارة بعناية علشان الطعم يفضل ثابت من أول نفس لآخر.",
    icon: Box
  },
  {
    id: 2,
    name: "سعر في مكانه",
    description: "جودة عالية من غير مبالغة في السعر.",
    icon: CardSim
  },
  {
    id: 3,
    name: "تجربة سهلة",
    description: "اختار، اطلب، واستنى شحنتك وانت مطمّن.",
    icon: Handshake
  },
  {
    id: 4,
    name: "أصلي 100%",
    description: "كل منتج مضمون علشان تستمتع من غير قلق.",
    icon: ShieldCheck
  }
]

// commented the left 2
// {
//   id: 5,
//   name: "فاهمين الشيشة",
//   description: "مش بنبيع وخلاص… إحنا فاهمين التجربة.",
//   icon: Heart
// },
// {
//   id: 6,
//   name: "فريق الشيشة",
//   description: "نحن الشيشة في كل مكان.",
//   icon: Send
// }



const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  const Icon = benefit.icon
  return (
    <div className="flex flex-col items-center grow">
      <Icon className="text-accent h-14 w-14"/>
      <span className="text-white mt-4">{benefit.name}</span>
      <span className="text-muted-foreground max-w-60 text-center">{benefit.description}</span>
    </div>
  )
}

const BenefitsSection = () => {
  return (
    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
        {
          benefits.map(ben => <BenefitCard key={ben.id} benefit={ben} />)
        }
      </div>
    </div>
    </div>
  )
}

export default BenefitsSection