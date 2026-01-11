import { constructMetadata } from "@/core/lib/seo";
import { Metadata } from "next";
import CollectionsPage from "./view";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("home");
}

export default function Page() {
  return (
    <CollectionsPage />
  );
}