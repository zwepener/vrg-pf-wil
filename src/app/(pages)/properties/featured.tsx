"use server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { RawProperty } from "@/lib/definitons";
import PropertyCard from "./property-card";

interface FeaturedProps {
  properties: RawProperty[];
}
export default async function Featured({ properties }: FeaturedProps) {
  return (
    <div className="p-10">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
