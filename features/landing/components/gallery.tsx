import Image from "next/image"

const galleryImages = [
  {
    src: "/luxurious-shisha-lounge-interior-with-dim-ambient-.jpg",
    alt: "Lounge Interior",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/close-up-hookah-smoke-swirling-artistic.jpg",
    alt: "Smoke Art",
    span: "",
  },
  {
    src: "/premium-shisha-accessories-coals-tongs.jpg",
    alt: "Accessories",
    span: "",
  },
  {
    src: "/cozy-corner-seating-area-in-hookah-lounge.jpg",
    alt: "VIP Area",
    span: "",
  },
  {
    src: "/exotic-tobacco-flavors-display-colorful.jpg",
    alt: "Flavors Display",
    span: "",
  },
]

export function GallerySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-primary tracking-[0.3em] uppercase text-sm mb-4">Our Atmosphere</p>
          <h2 className="text-4xl md:text-5xl font-sans text-foreground mb-4 text-balance">Step Inside</h2>
          <p className="font-body text-foreground/70 max-w-xl mx-auto">
            A glimpse into our world of elegance, comfort, and unforgettable experiences.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className={`relative overflow-hidden rounded-lg group ${image.span} aspect-square`}>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-body text-foreground text-sm tracking-wider">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
