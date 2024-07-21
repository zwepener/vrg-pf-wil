"use server";

import service_1 from "@/assets/images/service-1.png";
import service_2 from "@/assets/images/service-2.png";
import service_3 from "@/assets/images/service-3.png";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";

export default async function ServicePage() {
  return (
    <>
      <div className="service">
        <Container>
          <p className="section-subtitle">Our Services</p>
          <h2 className="h2 section-title">Our Main Focus</h2>
          <ul className="service-list">
            <li>
              <div className="service-card">
                <div className="card-icon">
                  <Image src={service_1} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="#">Buy a home</a>
                </h3>
                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <a href="#" className="card-link">
                  <span>Find A Home</span>
                  <FaIcon icon="arrow-right-long" />
                </a>
              </div>
            </li>

            <li>
              <div className="service-card">
                <div className="card-icon">
                  <Image src={service_2} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="#">Rent a home</a>
                </h3>
                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <a href="#" className="card-link">
                  <span>Find A Home</span>
                  <FaIcon icon="arrow-right-long" />
                </a>
              </div>
            </li>

            <li>
              <div className="service-card">
                <div className="card-icon">
                  <Image src={service_3} alt="Service icon" />
                </div>
                <h3 className="h3 card-title">
                  <a href="#">Sell a home</a>
                </h3>
                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
                <a href="#" className="card-link">
                  <span>Find A Home</span>
                  <FaIcon icon="arrow-right-long" />
                </a>
              </div>
            </li>
          </ul>
        </Container>
      </div>
      <div className="features">
        <Container>
          <p className="section-subtitle">Our Aminities</p>
          <h2 className="h2 section-title">Building Aminities</h2>
          <ul className="features-list">
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="car" />
                </div>
                <h3 className="card-title">Parking Space</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="droplet" />
                </div>
                <h3 className="card-title">Swimming Pool</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="shield-halved" />
                </div>
                <h3 className="card-title">Private Security</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="suitcase-medical" />
                </div>
                <h3 className="card-title">Medical Center</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="book" />
                </div>
                <h3 className="card-title">Library Area</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="bed" />
                </div>
                <h3 className="card-title">King Size Beds</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="house" />
                </div>
                <h3 className="card-title">Smart Homes</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="features-card">
                <div className="card-icon">
                  <FaIcon icon="basketball" />
                </div>
                <h3 className="card-title">{`Kid's Playland`}</h3>
                <div className="card-btn">
                  <FaIcon icon="arrow-right-long" />
                </div>
              </a>
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
}
