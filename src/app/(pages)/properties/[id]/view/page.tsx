"use server";

import PropertyBanner from "@/assets/images/property-banner.png";
import { fetchProperty } from "@/lib/data";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const { id: propertyId } = params;
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

      <section id="details">
        <ul>
          {Object.entries(property).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>

      <section id="images">
        {imageUrls?.map((imageUrl, index) => (
          <Image src={imageUrl} alt={`Image ${index}`} key={index} />
        ))}
      </section>

      <section id="map">{/* <Map placeId={address} /> */}</section>
    </>
  );
}
