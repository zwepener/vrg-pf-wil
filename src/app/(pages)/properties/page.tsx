"use server";

import Container from "@/components/ui/container";
import PropertyCarousel from "@/components/ui/property-carousel";
import { Separator } from "@/components/ui/separator";
import { fetchProperties } from "@/lib/data";
import PropertyCard from "../../../components/ui/property-card";

export default async function Page() {
  const properties = await fetchProperties();
  const featured = properties.filter((property) => property.featured === true);
  return (
    <div className="property">
      <Container className="container">
        <p className="section-subtitle">Properties</p>
        <h2 className="h2 section-title">Featured Listings</h2>
        {featured && <PropertyCarousel properties={featured} />}
        <Separator className="my-5" />
      </Container>
      <Container className="container">
        <ul className="flex flex-wrap justify-center gap-8 md:gap-20 p-5">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              className="md:w-1/3 w-full"
            />
          ))}
        </ul>
      </Container>
    </div>
  );
}
