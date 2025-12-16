import { Box, CardSim, Handshake, LucideIcon, Send, Users, Users2 } from "lucide-react"
import { FC } from "react"

interface Benefit {
  id: number
  name: string
  description?: string
  icon: LucideIcon
}

const benefits: Benefit[] = [
  {
    id: 1,
    name: "منتجات عالية الجودة",
    description: "Lorem ipsum dolor sit amet",
    icon: Box
  },
  {
    id: 2,
    name: "منتجات عالية الجودة",
    description: "Lorem ipsum dolor sit amet",
    icon: Users2
  },
  {
    id: 3,
    name: "منتجات عالية الجودة",
    description: "Lorem ipsum dolor sit amet",
    icon: CardSim
  },
  {
    id: 4,
    name: "منتجات عالية الجودة",
    description: "Lorem ipsum dolor sit amet",
    icon: Handshake
  },
]

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  const Icon = benefit.icon
  return (
    <div className="flex flex-col items-center grow">
      <Icon className="text-accent h-14 w-14"/>
      <span className="text-white mt-4">{benefit.name}</span>
      <span className="text-muted-foreground max-w-[200px]">{benefit.description}</span>
    </div>
  )
}

const BenefitsSection = () => {
  return (
    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex items-center space-between flex-wrap gap-12">
        {
          benefits.map(ben => <BenefitCard key={ben.id} benefit={ben} />)
        }
      </div>
    </div>
    </div>
  )
}

export default BenefitsSection