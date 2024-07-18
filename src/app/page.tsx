"use server";

import HeroBanner from "@/assets/images/hero-banner.png";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="hero">
        <Container>
          <div className="hero-content">
            <p className="hero-subtitle">
              <FaIcon icon="house" />
              <span>A Real Estate Listing Platform</span>
            </p>
            <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
            <p className="hero-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <button className="btn">Make An Enquiry</button>
          </div>
          <figure className="hero-banner">
            <Image
              src={HeroBanner}
              alt="Modern house model"
              className="w-100"
            />
          </figure>
        </Container>
      </div>
      <div className="cta">
        <Container>
          <div className="cta-card">
            <div className="card-content">
              <h2 className="h2 card-title">Looking for a dream home?</h2>

              <p className="card-text">
                We can help you realize your dream of a new home
              </p>
            </div>

            <button className="btn cta-btn">
              <span>Explore Properties</span>

              <FaIcon icon="arrow-right-long" />
            </button>
          </div>
        </Container>
      </div>
    </>
  );
}
