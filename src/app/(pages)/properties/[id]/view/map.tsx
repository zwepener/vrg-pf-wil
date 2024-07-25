"use client";

import LoadingSVG from "@/components/ui/loading-svg";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { getGeocode, getLatLng, LatLng } from "use-places-autocomplete";

export default function Map({ placeId }: { placeId: string }) {
  const [coords, setCoords] = useState<LatLng>();
  const [gotGeocode, setGotGeocode] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
  });

  if (isLoaded) {
    getGeocode({ placeId: placeId }).then((value) => {
      setCoords(getLatLng(value[0]));
      setGotGeocode(true);
    });
  }
  return (
    <>
      {isLoaded && gotGeocode && coords ? (
        <GoogleMap
          options={{
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
          }}
          center={coords}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "800px", height: "800px" }}
        >
          <MarkerF position={coords} />
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
