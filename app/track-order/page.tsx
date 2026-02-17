import {Metadata} from "next";
import {constructMetadata} from "@/core/lib/seo";
import TrackOrderPage from "@/app/track-order/view";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata("track_order");
}

export default function Page() {
  return (
      <TrackOrderPage />
  );
}