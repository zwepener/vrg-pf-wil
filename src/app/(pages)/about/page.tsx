"use server";

import about_banner_1 from "@/assets/images/about-banner-1.png";
import about_banner_2 from "@/assets/images/about-banner-2.jpg";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="about">
      <Container className="container">
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
            {`"Enimad minim veniam quis nostrud exercitation llamco laboris. Lorem
            ipsum dolor sit amet"`}
          </p>
          <Link
            href="/service"
            className="before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white before:transition-all before:duration-250 before:ease-in before:z-[-1] hover:bg-black focus:bg-black hover:text-[hsl(160,60%,15%)] focus:text-[hsl(160,60%,15%)] hover:border-black focus:border-black font-sans before:hover:w-full before:focus:w-full max-w-max uppercase lg:py-4 lg:px-10 md:py-3 md:px-7 md:text-base bg-[hsl(20,100%,65%)] text-white relative py-[10px] px-5 z-[1] border border-[hsl(20,100%,65%)] text-sm"
          >
            Our Services
          </Link>
        </div>
      </Container>
    </div>
  );
}
