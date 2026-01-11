import { constructMetadata } from "@/core/lib/seo";
import AboutPage from "./view";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("about");
}

export default async function Page() {
  return (
    <AboutPage />
  );
}