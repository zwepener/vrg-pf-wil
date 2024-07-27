"use server";

import PropertyBanner from "@/assets/images/property-banner.png";
import { fetchProperty } from "@/lib/data";
import Image from "next/image";
import Map from "./map";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params: { id: propertyId },
}: {
  params: { id: string };
}) {
  const {
    banner_url: bannerUrl,
    images: imageUrls,
    address,
    ...property
  } = await fetchProperty(propertyId);

  return (
    <>
      <section id="banner" className="flex justify-center">
        <Image
          src={bannerUrl ?? PropertyBanner}
          alt="Property Banner"
          width={500}
          height={500}
        />
      </section>
      <Separator className="my-5" />
      <section id="details">
        <p className="section-subtitle">Property Details</p>
        <ul>
          {Object.entries(property).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>
      <Separator className="my-5" />
      <section id="images" className="text-center">
        <p className="section-subtitle">Images</p>
        {imageUrls ? (
          imageUrls.map((imageUrl, index) => (
            <Image src={imageUrl} alt={`Image ${index}`} key={index} />
          ))
        ) : (
          <span>No Images To Show . . .</span>
        )}
      </section>
      <Separator className="my-5" />
      <section id="map">
        <p className="section-subtitle">Map Pin</p>
        <Map address={address} />
      </section>
    </>
  );
}
