import axios from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ProductDetailsPage from "@/app/products/[id]/view";
import AppConstants from "@/core/constants/app-constants";
import { getStorageLink } from "@/core/lib/storage";
import type { Product } from "@/features/products/types/product";

type PageProps = {
  params: Promise<{ id: string }>;
};

const getProductById = cache(async (id: string): Promise<Product | null> => {
  const productId = Number.parseInt(id, 10);

  if (Number.isNaN(productId)) {
    return null;
  }

  try {
    const response = await axios.get<Product | { data: Product }>(
      `${AppConstants.api_url}/products/${productId}`,
      {
        headers: {
          accept: "application/json",
          lang: "en",
        },
      },
    );

    if ("data" in response.data) {
      return response.data.data;
    }

    return response.data;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image = getStorageLink(product.cover_image) || "/placeholder.svg";
  const title = `${product.name} | ${product.collection.name}`;
  const description = product.description || `Shop ${product.name} from ${product.collection.name}.`;

  return {
    title,
    description,
    keywords: [product.name, product.collection.name, "hookah", "shisha"],
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  console.log(product);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
