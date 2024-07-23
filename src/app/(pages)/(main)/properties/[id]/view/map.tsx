"use client";

import LoadingSVG from "@/components/ui/loading-svg";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
    libraries: ["places"],
  });
  return (
    <>
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
    </>
  );
}
