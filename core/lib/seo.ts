import axios from "axios"
import { Metadata } from "next"
import AppConstants from "../constants/app-constants"

export interface Seo {
  page_name: string
  title: string
  description: string
  keywords: string | null
  og_image: string | null // Open Graph Image URL
  updated_at: string
}

type SeoKey = 'home' | 'collections' | 'cart' | 'checkout' | 'contact' | 'about'

const getSeoData = async (key: SeoKey): Promise<Seo> => {
    const response = await axios.get<Seo>(`${AppConstants.api_url}/seos/${key}`)
    return response.data
}

export const constructMetadata = async (seo_key: SeoKey): Promise<Metadata> => {
    const seo = await getSeoData(seo_key)

    return {
        title: `${seo.page_name} - ${seo.title}`,
        description: seo.description,
        keywords: seo.keywords,
        
        openGraph: {
            title: `${seo.page_name} - ${seo.title}`,
            description: seo.description,
            images: seo.og_image ? [seo.og_image] : ['/public/images/logo.png'],
        },

        twitter: {
            card: 'summary_large_image',
            title: `${seo.page_name} - ${seo.title}`,
            description: seo.description,
            images: seo.og_image ? [seo.og_image] : ['/public/images/logo.png'],
        },

        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        icons: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                url: '/public/images/logo.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/public/images/logo.png',
            },
        ],
    }
}