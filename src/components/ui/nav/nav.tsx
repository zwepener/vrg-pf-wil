import Link from "next/link";
import { Logo } from "../assets";
import Container from "../container";
import FaIcon from "../fa-icon";
import NavLinks from "./nav-links";
import ProfileMenu from "./profile-menu";

export function TopNav() {
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

          <div className="wrapper flex">
            <Link href="/properties/add" className="header-top-btn">
              Add Listing
            </Link>
          </div>
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

            <button
              className="header-bottom-actions-btn"
              data-nav-open-btn
              aria-label="Open Menu"
            >
              <FaIcon icon="bars" />
              <span>Menu</span>
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}

export function FooterNav() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Container className="container">
          <div className="footer-brand">
            <Logo variant="light" />

            <p className="section-text">
              Lorem Ipsum is simply dummy text of the and typesetting industry.
              Lorem Ipsum is dummy text of the printing.
            </p>

            <ul className="contact-list">
              <li>
                <a href="mailto:vrg.realhome@gmail.com" className="contact-link">
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
