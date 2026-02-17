import {constructMetadata} from "@/core/lib/seo";
import {Metadata} from "next";
import ContactPage from "@/app/contact/view";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("contact");
}

export default function Page() {
  return (
      <ContactPage />
  );
}