"use client";

import LoadingSVG from "@/components/ui/loading-svg";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng, type LatLng } from "use-places-autocomplete";

export default function Map({ address }: { address: string }) {
  const [coords, setCoords] = useState<LatLng>();
  const [gotGeocode, setGotGeocode] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
  });

  useEffect(() => {
    if (isLoaded) {
      getGeocode({ address: address }).then((value) => {
        const latlng = getLatLng(value[0]);
        setCoords(latlng);
        setGotGeocode(true);
      });
    }
  }, [isLoaded]);

  return (
    <div className="flex justify-center p-5">
      {isLoaded && gotGeocode && coords ? (
        <GoogleMap
          options={{
            disableDefaultUI: true,
            clickableIcons: true,
            zoomControl: true,
          }}
          zoom={14}
          center={coords}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "100%", height: "800px" }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          <Marker position={coords} />
        </GoogleMap>
      ) : (
        <>
          <LoadingSVG />
          <span>Loading . . .</span>
        </>
      )}
    </div>
  );
}
