"use server";

import Container from "@/components/ui/container";
import { fetchProperties } from "@/lib/data";
import PropertyCard from "./property-card";

export default async function Page() {
  const properties = await fetchProperties();
  const featured = properties.filter((property) => property.featured === true);
  return (
    <div className="property">
      <Container className="container">
        <p className="section-subtitle">Properties</p>
        <h2 className="h2 section-title">Featured Listings</h2>
        <ul className="property-list has-scrollbar">
          {featured.map((property) => (
            <li key={property.id}>
              <PropertyCard payload={property} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
