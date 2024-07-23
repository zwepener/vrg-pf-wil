"use server";

import { fetchProperty } from "@/lib/data";
import Image from "next/image";
import Map from "./map";

export default async function Page({ params }: { params: { id: string } }) {
  const {
    images: image_urls,
    address,
    ...property
  } = await fetchProperty(params.id);
  const [lat, lng] = address.split(",").map((item) => parseFloat(item));

  return (
    <>
      <section id="details">
        <ul>
          {Object.entries(property).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>

      <section id="images">
        {image_urls.map((image_url, index) => (
          <Image src={image_url} alt={`Image ${index}`} key={index} />
        ))}
      </section>

      <section id="map">
        <Map lat={lat} lng={lng} />
      </section>
    </>
  );
}
