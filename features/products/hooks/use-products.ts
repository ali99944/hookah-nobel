import type { Category } from "@/features/categories/types/category"
import type { Product } from "../types/product"

function useProducts() {
  const hookaCategory: Category = {
    id: 1,
    name: "شيش",
  }

  const tobaccoCategory: Category = {
    id: 2,
    name: "معسل",
  }

  const accessoriesCategory: Category = {
    id: 3,
    name: "إكسسوارات",
  }

  const coalsCategory: Category = {
    id: 4,
    name: "فحم",
  }

  const products: Product[] = [
    {
      id: 1,
      name: "شيشة كريزمون كلاسيك",
      category: hookaCategory,
      gallery: [
        { id: 1, source: "/images/products/p2.jpg" },
        { id: 2, source: "/images/products/p2.jpg" },
      ],
      image: "/images/products/p2.jpg",
      price: 450,
      description:
        "شيشة كريزمون الكلاسيكية بتصميم أنيق وعصري، مصنوعة من مواد عالية الجودة لضمان تجربة تدخين مثالية. تتميز بسهولة التنظيف والصيانة.",
      stock: 15,
      is_active: true,
      features: {
        الارتفاع: "70 سم",
        المادة: "ستانلس ستيل",
        'عدد الخراطيم': "1",
        اللون: "فضي وذهبي",
      },
    },
    {
      id: 2,
      name: "شيشة ألفا برو",
      category: hookaCategory,
      gallery: [{ id: 3, source: "/images/products/p2.jpg" }],
      image: "/images/products/p2.jpg",
      price: 550,
      description:
        "شيشة ألفا برو المصممة للمحترفين، بقاعدة زجاجية فاخرة وأنبوب من الكربون. توفر أداءً استثنائياً وكثافة دخان عالية.",
      stock: 8,
      is_active: true,
      features: {
        الارتفاع: "80 سم",
        المادة: "كربون وزجاج",
        'عدد الخراطيم': "2",
        اللون: "أسود وأحمر",
        الوزن: "2.5 كجم",
      },
    },
    {
      id: 3,
      name: "معسل الفاخر - نكهة التفاح المزدوج",
      category: tobaccoCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 85,
      description:
        "معسل الفاخر بنكهة التفاح المزدوج الأصلية، معبأ بعناية فائقة لضمان النكهة الطازجة. مصنوع من أجود أنواع التبغ الطبيعي.",
      stock: 50,
      is_active: true,
      features: {
        الوزن: "250 جرام",
        النكهة: "تفاح مزدوج",
        المنشأ: "الإمارات",
        النوع: "معسل فواكه",
      },
    },
    {
      id: 4,
      name: "معسل الفاخر - نكهة النعناع بالليمون",
      category: tobaccoCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 85,
      description:
        "معسل منعش بنكهة النعناع والليمون، يوفر تجربة باردة ومنعشة. مثالي لعشاق النكهات الطبيعية والمنعشة.",
      stock: 45,
      is_active: true,
      features: {
        الوزن: "250 جرام",
        النكهة: "نعناع بالليمون",
        المنشأ: "الإمارات",
        النوع: "معسل نعناع",
      },
    },
    {
      id: 5,
      name: "معسل الفاخر - نكهة التوت المشكل",
      category: tobaccoCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 90,
      description:
        "مزيج رائع من نكهات التوت الطازجة، يجمع بين الفراولة والتوت الأزرق والتوت الأحمر. نكهة غنية ومميزة.",
      stock: 30,
      is_active: true,
      features: {
        الوزن: "250 جرام",
        النكهة: "توت مشكل",
        المنشأ: "الإمارات",
        النوع: "معسل فواكه",
      },
    },
    {
      id: 6,
      name: "فحم جوز الهند الطبيعي",
      category: coalsCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 45,
      description:
        "فحم طبيعي 100% من قشور جوز الهند، خالٍ من المواد الكيميائية. يدوم طويلاً ويعطي حرارة متوازنة دون رائحة أو طعم.",
      stock: 100,
      is_active: true,
      features: {
        الوزن: "1 كجم",
        النوع: "طبيعي",
        'عدد القطع': "64 قطعة",
        'مدة الاشتعال': "60-90 دقيقة",
      },
    },
    {
      id: 7,
      name: "فحم سريع الاشتعال",
      category: coalsCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 35,
      description:
        "فحم سريع الاشتعال، يصل للحرارة المثالية خلال دقائق معدودة. مثالي للاستخدام السريع والعملي.",
      stock: 80,
      is_active: true,
      features: {
        الوزن: "500 جرام",
        النوع: "سريع الاشتعال",
        'عدد القطع': "33 قطعة",
        'وقت الاشتعال': "3-5 دقائق",
      },
    },
    {
      id: 8,
      name: "مبسم سيليكون ملون",
      category: accessoriesCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 15,
      description:
        "مبسم من السيليكون الطبي عالي الجودة، متوفر بألوان متعددة. سهل التنظيف وآمن للاستخدام الصحي.",
      stock: 200,
      is_active: true,
      features: {
        المادة: "سيليكون طبي",
        الألوان: "متعدد",
        العدد: "قطعة واحدة",
        'قابل للغسل': "نعم",
      },
    },
    {
      id: 9,
      name: "خرطوم شيشة سيليكون قابل للغسل",
      category: accessoriesCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 65,
      description:
        "خرطوم شيشة من السيليكون الفاخر، قابل للغسل بالكامل دون صدأ أو تلف. يوفر سحبة سلسة ومريحة.",
      stock: 40,
      is_active: true,
      features: {
        الطول: "1.8 متر",
        المادة: "سيليكون مرن",
        'قابل للغسل': "نعم",
        اللون: "أسود",
      },
    },
    {
      id: 10,
      name: "رأس شيشة فخار تقليدي",
      category: accessoriesCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 25,
      description:
        "رأس شيشة من الفخار المصنوع يدوياً، يوفر توزيعاً مثالياً للحرارة. تصميم تقليدي أصيل.",
      stock: 60,
      is_active: true,
      features: {
        المادة: "فخار طبيعي",
        النوع: "تقليدي",
        القطر: "7 سم",
        العمق: "10 سم",
      },
    },
    {
      id: 11,
      name: "شيشة ميني المحمولة",
      category: hookaCategory,
      gallery: [],
      image: "/images/products/p2.jpg",
      price: 180,
      description:
        "شيشة صغيرة محمولة مثالية للسفر والرحلات، سهلة الحمل والتركيب. تأتي مع حقيبة حمل خاصة.",
      stock: 25,
      is_active: true,
      features: {
        الارتفاع: "35 سم",
        المادة: "ألومنيوم",
        'عدد الخراطيم': "1",
        محمولة: "نعم",
        الوزن: "800 جرام",
      },
    },
    {
      id: 12,
      name: "معسل الفاخر - نكهة العنب",
      category: tobaccoCategory,
      gallery: [],
      image: "/images/box.png",
      price: 85,
      description: "معسل بنكهة العنب الأصلية، غني وعميق النكهة. مثالي للاستمتاع بالجلسات الطويلة.",
      stock: 35,
      is_active: true,
      features: {
        الوزن: "250 جرام",
        النكهة: "عنب",
        المنشأ: "الإمارات",
        النوع: "معسل فواكه",
      },
    },
  ]

  return { products }
}

export default useProducts
