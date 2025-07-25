import React from "react";
import { Metadata } from "next";
import { Hero } from "@travel-platform/ui-components";
import Destination from "@/components/Home/Destinations";
import FeaturesSlider from "@/components/Home/Features";
import PackageSlider from "@/components/Home/PackagesSlide";
import Testimonials from "@/components/Home/Testimonial";
import Blog from "@/components/SharedComponent/Blog";
import JournyInfo from "@/components/SharedComponent/journyInfo";
import PopularCountries from "@/components/Home/Countries";
import qs from "qs";
export const metadata: Metadata = {
  title: "Luxury Travels - Your Dream Vacation Awaits",
  description:
    "Discover amazing holiday deals and travel packages. Book your dream vacation today with exclusive offers on tours, hotels, and experiences worldwide.",
};

import { Package as PackageType } from "@/types/package";

export default async function Home() {
  const packages = await fetchPackages();

  return (
    <main>
      <Hero
        title="Luxury Travels"
        subtitle="Discover Amazing Travel Deals & Packages"
        backgroundImage="/images/hero/travel-bg.jpg"
        price={{
          amount: 299,
          currency: "$",
          duration: "Flight + 3 Nights",
        }}
        searchForm={true}
        variant="luxury"
      />
      <Destination />
      <FeaturesSlider />
      <PackageSlider packages={packages} mediaStartURL={process?.env?.PAYLOAD_CMS_MEDIA_URL} />
      <PopularCountries />
      <Testimonials />
      <Blog />
      <JournyInfo />
    </main>
  );
}

async function fetchPackages(): Promise<PackageType[]> {
  const query = qs.stringify(
    {
      where: {
        sites: {
          in: ["all", "luxury-travel"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await fetch(
    `${process.env.PAYLOAD_CMS_API_URL}/tours?${query}`,
    {
      cache: "no-store", // or 'force-cache' if you want caching
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }
  const data = await res.json();
  return data.docs || data;
}
