"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Logo } from "../assets";
import Container from "../container";
import FaIcon from "../fa-icon";
import MenuSheet from "./menu-sheet";
import NavLinks from "./nav-links";
import ProfileMenu from "./profile-menu";

export async function TopNav() {
  const session = await getServerSession(authOptions);

  return (
    <header className="header" data-header>
      <div className="overlay" data-overlay></div>

      <div className="header-top">
        <Container className="container">
          <ul className="header-top-list">
            <li>
              <a
                href="MailIconto:vrg.realhome@gmail.com"
                className="header-top-link"
              >
                <FaIcon icon="envelope" />
                <span>vrg.realhome@gmail.com</span>
              </a>
            </li>
          </ul>

          {session &&
            (session.user.role === "admin" ||
              session.user.role === "agent") && (
              <div className="wrapper flex">
                <Link href="/properties/add" className="header-top-btn">
                  Add Listing
                </Link>
              </div>
            )}
        </Container>
      </div>

      <div className="header-bottom">
        <Container className="container">
          <Logo variant="dark" />

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <Logo variant="dark" />

              <button
                className="nav-close-btn"
                data-nav-close-btn
                aria-label="Close Menu"
              >
                <FaIcon icon="square-xmark" />
              </button>
            </div>

            <div className="navbar-bottom">
              <NavLinks />
            </div>
          </nav>

          <div className="header-bottom-actions">
            <ProfileMenu />

            <MenuSheet className="header-bottom-actions-btn" />
          </div>
        </Container>
      </div>
    </header>
  );
}

export async function FooterNav() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Container className="container">
          <div className="footer-brand">
            <Logo variant="light" />

            <p className="section-text">
              Please note that this website is not a real property listing
              website. This is a college project and all of the properties
              listed on this website is for demonstrative purposes only.
            </p>

            <ul className="contact-list">
              <li>
                <a
                  href="mailto:vrg.realhome@gmail.com"
                  className="contact-link"
                >
                  <FaIcon icon="envelope" />
                  <span>vrg.realhome@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-box">
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Company</p>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact us
                </Link>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Services</p>
              </li>
              <li>
                <Link href="/profile/wishlist" className="footer-link">
                  Wish List
                </Link>
              </li>
              <li>
                <Link href="/auth" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/profile" className="footer-link">
                  My account
                </Link>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Customer Care</p>
              </li>
              <li>
                <Link href="/auth" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/profile" className="footer-link">
                  My account
                </Link>
              </li>
              <li>
                <Link href="/profile/wishlist" className="footer-link">
                  Wish List
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container className="container">
          <p className="copyright">&copy; 2024. All Rights Reserved</p>
        </Container>
      </div>
    </footer>
  );
}
