import { Logo } from "../assets";
import Container from "../container";
import FaIcon from "../fa-icon";
import NavLinks from "./nav-links";

const TopNav = () => (
  <header className="header" data-header>
    <div className="overlay" data-overlay></div>

    <div className="header-top">
      <Container>
        <ul className="header-top-list">
          <li>
            <a href="MailIconto:realhome@gmail.com" className="header-top-link">
              <FaIcon icon="envelope" />
              <span>realhome@gmail.com</span>
            </a>
          </li>
        </ul>

        <div className="wrapper flex">
          <button className="header-top-btn">Add Listing</button>
        </div>
      </Container>
    </div>

    <div className="header-bottom">
      <Container>
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
          <button className="header-bottom-actions-btn" aria-label="Search">
            <FaIcon icon="magnifying-glass" />
            <span>Search</span>
          </button>

          <button className="header-bottom-actions-btn" aria-label="Profile">
            <FaIcon variant="regular" icon="user" />
            <span>Profile</span>
          </button>

          <button className="header-bottom-actions-btn" aria-label="Cart">
            <FaIcon icon="cart-shopping" />
            <span>Cart</span>
          </button>

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

const FooterNav = async () => (
  <footer className="footer">
    <div className="footer-top">
      <Container>
        <div className="footer-brand">
          <Logo variant="light" />

          <p className="section-text">
            Lorem Ipsum is simply dummy text of the and typesetting industry.
            Lorem Ipsum is dummy text of the printing.
          </p>

          <ul className="contact-list">
            <li>
              <a href="mailto:realhome@gmail.com" className="contact-link">
                <FaIcon icon="envelope" />
                <span>realhome@gmail.com</span>
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
              <a href="#" className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                All Products
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Locations Map
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact us
              </a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Services</p>
            </li>
            <li>
              <a href="#" className="footer-link">
                Order tracking
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Wish List
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                My account
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Promotional Offers
              </a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Customer Care</p>
            </li>
            <li>
              <a href="#" className="footer-link">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                My account
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Wish List
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Order tracking
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>

    <div className="footer-bottom">
      <Container>
        <p className="copyright">&copy; 2024. All Rights Reserved</p>
      </Container>
    </div>
  </footer>
);

export { FooterNav, TopNav };
