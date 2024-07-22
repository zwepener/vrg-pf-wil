"use server";

import { fetchProperty } from "@/lib/data";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "dotenv/config";
import Image from "next/image";
import LoadingSVG from "@/components/ui/loading-svg";

export default async function Page({ params }: { params: { id: string } }) {
  const {
    images: image_urls,
    address,
    ...property
  } = await fetchProperty(params.id);
  const [lat, lng] = address.split(",").map((item) => parseFloat(item));

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_SECRET as string,
    libraries: ["places"],
  });
  return (
    <>
      <section id="details">
        <ul>
          {Object.entries(property).map(([key, value]) => (
            <li>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>

      <section id="images">
        {image_urls.map((image_url, index) => (
          <Image src={image_url} alt={`Image ${index}`} />
        ))}
      </section>

      <section id="map">
        {isLoaded ? (
          <GoogleMap
            options={{
              disableDefaultUI: true,
              clickableIcons: true,
              scrollwheel: false,
            }}
            zoom={14}
            center={{ lat: lat, lng: lng }}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "800px", height: "800px" }}
          >
            <MarkerF position={{ lat: lat, lng: lng }} />
          </GoogleMap>
        ) : (
          <>
            <LoadingSVG />
            <span>Loading . . .</span>
          </>
        )}
      </section>
    </>
  );
}
