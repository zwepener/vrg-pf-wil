"use server";

import author from "@/assets/images/author.jpg";
import property_1 from "@/assets/images/property-1.jpg";
import property_2 from "@/assets/images/property-2.jpg";
import property_3 from "@/assets/images/property-3.jpg";
import property_4 from "@/assets/images/property-4.png";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ReactNode } from "react";

interface CardFooterProps {
  author_img: string | StaticImport;
  author_name: string;
  author_title: string;
}
const CardFooter = ({
  author_img,
  author_name,
  author_title,
}: CardFooterProps) => (
  <div className="card-footer">
    <div className="card-author">
      <figure className="author-avatar">
        <Image src={author_img} alt={author_name} className="w-100" />
      </figure>
      <div>
        <p className="author-name">
          <a href="#">{author_name}</a>
        </p>
        <p className="author-title">{author_title}</p>
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
);

interface CardContentProps {
  price: number;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}
const CardContent = ({
  price,
  title,
  description,
  bedrooms,
  bathrooms,
  area,
}: CardContentProps) => (
  <div className="card-content">
    <div className="card-price">
      <strong>{`$${price}`}</strong>/Month
    </div>
    <h3 className="h3 card-title">
      <a href="#">{title}</a>
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
      <li className="card-item">
        <strong>{area}</strong>
        <FaIcon variant="regular" icon="fa-square" />
        <span>Square Ft</span>
      </li>
    </ul>
  </div>
);

interface CardBannerProps {
  img: string | StaticImport;
  alt: string;
  type: "Rent" | "Sale";
  address: string;
  photos: number;
  videos: number;
}
const CardBanner = ({
  img,
  alt,
  type,
  address,
  photos,
  videos,
}: CardBannerProps) => (
  <figure className="card-banner">
    <a href="#">
      <Image src={img} alt={alt} className="w-100" />
    </a>
    <div
      className={`card-badge ${type === "Rent" ? "green" : "orange"}`}
    >{`For ${type}`}</div>
    <div className="banner-actions">
      <button className="banner-actions-btn">
        <FaIcon icon="location-dot" />
        <address>{address}</address>
      </button>
      <button className="banner-actions-btn">
        <FaIcon icon="camera" />
        <span>{photos}</span>
      </button>
      <button className="banner-actions-btn">
        <FaIcon icon="film" />
        <span>{videos}</span>
      </button>
    </div>
  </figure>
);

const PropertyCard = ({ children }: { children: ReactNode }) => (
  <div className="property-card">{children}</div>
);

export default async function PropertyPage() {
  return (
    <div className="property">
      <Container>
        <p className="section-subtitle">Properties</p>
        <h2 className="h2 section-title">Featured Listings</h2>
        <ul className="property-list has-scrollbar">
          <li>
            <PropertyCard>
              <CardBanner
                img={property_1}
                alt="New Apartment Nice View"
                type="Rent"
                address="Belmont Gardens, Chicago"
                photos={4}
                videos={2}
              />
              <CardContent
                price={34900}
                title="New Apartment Nice View"
                description="Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood"
                bedrooms={3}
                bathrooms={2}
                area={3450}
              />
              <CardFooter
                author_img={author}
                author_name="William Seklo"
                author_title="Estate Agents"
              />
            </PropertyCard>
          </li>
          <li>
            <PropertyCard>
              <CardBanner
                img={property_2}
                alt="Modern Apartments"
                type="Sale"
                address="Belmont Gardens, Chicago"
                photos={4}
                videos={2}
              />
              <CardContent
                price={34900}
                title="Modern Apartments"
                description="Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood"
                bedrooms={3}
                bathrooms={2}
                area={3450}
              />
              <CardFooter
                author_img={author}
                author_name="William Seklo"
                author_title="Estate Agents"
              />
            </PropertyCard>
          </li>
          <li>
            <PropertyCard>
              <CardBanner
                img={property_3}
                alt="Comfortable Apartment"
                type="Rent"
                address="Belmont Gardens, Chicago"
                photos={4}
                videos={2}
              />
              <CardContent
                price={34900}
                title="Comfortable Apartment"
                description="Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood"
                bedrooms={3}
                bathrooms={2}
                area={3450}
              />
              <CardFooter
                author_img={author}
                author_name="William Seklo"
                author_title="Estate Agents"
              />
            </PropertyCard>
          </li>
          <li>
            <PropertyCard>
              <CardBanner
                img={property_4}
                alt="Luxury villa in Rego Park"
                type="Sale"
                address="Belmont Gardens, Chicago"
                photos={4}
                videos={2}
              />
              <CardContent
                price={34900}
                title="Luxury villa in Rego Park"
                description="Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood"
                bedrooms={3}
                bathrooms={2}
                area={3450}
              />
              <CardFooter
                author_img={author}
                author_name="William Seklo"
                author_title="Estate Agents"
              />
            </PropertyCard>
          </li>
        </ul>
      </Container>
    </div>
  );
}
