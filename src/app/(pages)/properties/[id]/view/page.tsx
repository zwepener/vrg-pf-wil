"use server";

import PropertyBanner from "@/assets/images/property-banner.png";
import { fetchProperty } from "@/lib/data";
import Image from "next/image";
import Map from "./map";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import FaIcon from "@/components/ui/fa-icon";

export default async function Page({
  params: { id: propertyId },
}: {
  params: { id: string };
}) {
  const {
    agent_id: agentId,
    banner_url: bannerUrl,
    images: imageUrls,
    address,
    ...property
  } = await fetchProperty(propertyId);

  const session = await getServerSession(authOptions);

  return (
    <div className="p-5">
      <section id="details">
        <p className="section-subtitle">Property Details</p>
        <div className="md:flex md:items-center md:space-x-5">
          <Image
            src={bannerUrl ?? PropertyBanner}
            alt="Property Banner"
            width={500}
            height={500}
          />
          <Separator className="my-5 lg:hidden" />
          <div className="grow">
            <ul className="space-y-2">
              {Object.entries(property).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          </div>
        </div>
        {(session?.user.role === "admin" || session?.user.id === agentId) && (
          <div>
            <Separator className="my-5" />
            <div className="flex space-x-2">
              <Button>
                <Link
                  href={`/properties/${propertyId}/edit`}
                  className="flex items-center space-x-1"
                >
                  <FaIcon icon="pen-to-square" />
                  <span>Edit</span>
                </Link>
              </Button>
              <Button>Toggle Hidden</Button>
              <Separator orientation="vertical" />
              <Button variant="destructive">Remove</Button>
            </div>
          </div>
        )}
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
    </div>
  );
}
