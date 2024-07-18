"use server";

import about_banner_1 from "@/assets/images/about-banner-1.png";
import about_banner_2 from "@/assets/images/about-banner-2.jpg";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
  return (
    <div className="about">
      <Container>
        <figure className="about-banner">
          <Image src={about_banner_1} alt="House interior" />
          <Image
            src={about_banner_2}
            alt="House interior"
            className="abs-img"
          />
        </figure>
        <div className="about-content">
          <p className="section-subtitle">About Us</p>
          <h2 className="h2 section-title">
            The Leading Real Estate Rental Marketplace.
          </h2>
          <p className="about-text">
            Over 39,000 people work for us in more than 70 countries all over
            the This breadth of global coverage, combined with specialist
            services
          </p>
          <ul className="about-list">
            <li className="about-item">
              <div className="about-item-icon">
                <FaIcon icon="house" />
              </div>
              <p className="about-item-text">Smart Home Design</p>
            </li>
            <li className="about-item">
              <div className="about-item-icon">
                <FaIcon icon="leaf" />
              </div>
              <p className="about-item-text">Beautiful Scene Around</p>
            </li>
            <li className="about-item">
              <div className="about-item-icon">
                <FaIcon icon="wine-glass" />
              </div>
              <p className="about-item-text">Exceptional Lifestyle</p>
            </li>
            <li className="about-item">
              <div className="about-item-icon">
                <FaIcon icon="shield-halved" />
              </div>
              <p className="about-item-text">Complete 24/7 Security</p>
            </li>
          </ul>
          <p className="callout">
            "Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem
            ipsum dolor sit amet"
          </p>
          <Link href="/service" className="btn">
            Our Services
          </Link>
        </div>
      </Container>
    </div>
  );
}
