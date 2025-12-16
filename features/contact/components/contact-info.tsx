import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "العنوان",
    details: ["الرياض، المملكة العربية السعودية", "شارع الملك فهد، برج المكتبة"],
  },
  {
    icon: Phone,
    title: "الهاتف",
    details: ["+966 11 234 5678", "+966 50 123 4567"],
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    details: ["info@rufoof.com", "support@rufoof.com"],
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    details: ["الأحد - الخميس: 9 ص - 6 م", "الجمعة والسبت: مغلق"],
  },
]

export function ContactInfo() {
  return (
    <div className="bg-card rounded-2xl p-6 ">
      <h2 className="text-2xl  text-primary mb-6">معلومات التواصل</h2>

      <div className="space-y-6">
        {contactDetails.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className=" text-foreground mb-1">{item.title}</h3>
              {item.details.map((detail) => (
                <p key={detail} className="text-sm text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
