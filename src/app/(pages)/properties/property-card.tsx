"use server";

import PropertyBanner from "@/assets/images/property-banner.png";
import UserAvatar from "@/assets/images/user-avatar.png";
import FaIcon from "@/components/ui/fa-icon";
import { fetchUserById } from "@/lib/data";
import type { RawProperty } from "@/lib/definitons";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: RawProperty;
}
export default async function PropertyCard({
  property: {
    id: propertyId,
    address,
    agent_id,
    banner_url,
    listing_type,
    title,
    price,
    description,
    bedrooms,
    bathrooms,
    images,
  },
}: PropertyCardProps) {
  const {
    id: userId,
    avatar_url,
    firstname,
    lastname,
    role,
  } = await fetchUserById(agent_id);

  return (
    <div className="property-card">
      <figure className="card-banner">
        <Link href={`/properties/${propertyId}/view`}>
          <Image
            src={banner_url ?? PropertyBanner}
            alt={title}
            className="w-100"
          />
        </Link>
        <div
          className={`card-badge select-none ${
            listing_type === "rent" ? "green" : "orange"
          }`}
        >
          {listing_type === "rent" ? "To Let" : "For Sale"}
        </div>
        <div className="banner-actions">
          <Link
            href={`/properties/${propertyId}/view#map`}
            className="banner-actions-btn"
          >
            <FaIcon icon="location-dot" />
            <address>{address}</address>
          </Link>
          <Link
            href={`/properties/${propertyId}/view#images`}
            className="banner-actions-btn"
          >
            <FaIcon icon="camera" />
            <span>{images?.length ?? 0}</span>
          </Link>
        </div>
      </figure>
      <div className="card-content">
        <div className="card-price select-none">
          <strong>{`R${price}`}</strong>
          {listing_type === "rent" ? " / Month" : ""}
        </div>
        <h3 className="h3 card-title select-none">
          <Link href={`/properties/${propertyId}/view`}>{title}</Link>
        </h3>
        <p className="card-text select-none">{description}</p>
        <ul className="card-list">
          <li className="card-item select-none">
            <strong>{bedrooms}</strong>
            <FaIcon icon="bed" />
            <span>Bedrooms</span>
          </li>
          <li className="card-item select-none">
            <strong>{bathrooms}</strong>
            <FaIcon icon="person" />
            <span>Bathrooms</span>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <div className="card-author">
          <figure className="author-avatar">
            <Image
              src={avatar_url ?? UserAvatar}
              alt={"User"}
              className="w-100"
            />
          </figure>
          <div>
            <p className="author-name">
              <Link href={`/users/${userId}/view`}>
                {`${firstname} ${lastname}`}
              </Link>
            </p>
            <p className="author-title select-none">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
