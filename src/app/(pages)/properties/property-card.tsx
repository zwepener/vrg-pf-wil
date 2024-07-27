"use server";

import PropertyBanner from "@/assets/images/property-banner.png";
import FaIcon from "@/components/ui/fa-icon";
import { fetchUserById } from "@/lib/data";
import type { RawProperty } from "@/lib/definitons";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "@/assets/images/user-avatar.png"

interface PropertyCardProps {
  payload: RawProperty;
}
export default async function PropertyCard({
  payload: {
    id: propertyId,
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
          className={`card-badge ${
            listing_type === "rent" ? "green" : "orange"
          }`}
        >
          {listing_type === "rent" ? "To Let" : "For Sale"}
        </div>
        <div className="banner-actions">
          <button className="banner-actions-btn">
            <FaIcon icon="location-dot" />
            <address>N / A</address>
          </button>
          <button className="banner-actions-btn">
            <FaIcon icon="camera" />
            <span>{images?.length ?? 0}</span>
          </button>
        </div>
      </figure>
      <div className="card-content">
        <div className="card-price">
          <strong>{`R${price}`}</strong>
          {listing_type === "rent" ? " / Month" : ""}
        </div>
        <h3 className="h3 card-title">
          <Link href={`/properties/${propertyId}/view`}>{title}</Link>
        </h3>
        <p className="card-text">{description}</p>
        <ul className="card-list">
          <li className="card-item">
            <strong>{bedrooms}</strong>
            <FaIcon icon="bed" />
            <span>Bedrooms</span>
          </li>
          <li className="card-item">
            <strong>{bathrooms}</strong>
            <FaIcon icon="person" />
            <span>Bathrooms</span>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <div className="card-author">
          <figure className="author-avatar">
            <Image src={avatar_url ?? UserAvatar} alt={"User"} className="w-100" />
          </figure>
          <div>
            <p className="author-name">
              <Link href={`/users/${userId}/view`}>
                {`${firstname} ${lastname}`}
              </Link>
            </p>
            <p className="author-title">{role}</p>
          </div>
        </div>
        <div className="card-footer-actions">
          <button className="card-footer-actions-btn">
            <FaIcon icon="up-right-and-down-left-from-center" />
          </button>
          <button className="card-footer-actions-btn">
            <FaIcon icon="heart" />
          </button>
          <button className="card-footer-actions-btn">
            <FaIcon icon="circle-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}
