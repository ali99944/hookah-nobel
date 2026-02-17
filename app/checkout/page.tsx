import {Metadata} from "next";
import {constructMetadata} from "@/core/lib/seo";
import CheckoutPage from "@/app/checkout/view";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("checkout");
}

export default function Page() {
  return (
      <CheckoutPage />
  );
}