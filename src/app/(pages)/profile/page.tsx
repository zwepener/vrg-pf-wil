"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PropertyCarousel from "@/components/ui/property-carousel";
import { Separator } from "@/components/ui/separator";
import { fetchPropertiesByAgent, fetchProperty } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/auth?callbackUrl=/profile");

  const {
    user: { id: userId, favorites, wishlist, ...user },
  } = session;

  const favProperties =
    favorites &&
    (await Promise.all(
      favorites.map((propertyId) => fetchProperty(propertyId))
    ));

  const wishProperties =
    wishlist &&
    (await Promise.all(
      wishlist
        .filter((propertyId) => !favorites?.includes(propertyId))
        .map((propertyId) => fetchProperty(propertyId))
    ));

  const managedProperties =
    (user.role === "admin" || user.role === "agent") &&
    (await fetchPropertiesByAgent(userId));

  return (
    <div>
      <section id="details">
        <p className="section-subtitle">Profile Details</p>
        <ul>
          {Object.entries(user).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>
      {(user.role === "admin" || user.role === "agent") && (
        <>
          <Separator className="my-5" />
          <section id="managed" className="text-center">
            <p className="section-subtitle">Managed Properties</p>
            {managedProperties && managedProperties.length ? (
              <PropertyCarousel properties={managedProperties} variant="mini" />
            ) : (
              "No properties to show . . ."
            )}
          </section>
        </>
      )}
      <Separator className="my-5" />
      <section id="favorites" className="text-center">
        <p className="section-subtitle">Favorites</p>
        {favProperties ? (
          <PropertyCarousel properties={favProperties} />
        ) : (
          "No favorites to show . . ."
        )}
      </section>
      <Separator className="my-5" />
      <section id="wishlist" className="text-center">
        <p className="section-subtitle">Wishlist</p>
        {wishProperties ? (
          <PropertyCarousel properties={wishProperties} />
        ) : (
          "Wishlist is empty . . ."
        )}
      </section>
    </div>
  );
}
