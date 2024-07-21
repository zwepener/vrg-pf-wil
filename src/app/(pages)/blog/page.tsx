"use server";

import blog_1 from "@/assets/images/blog-1.png";
import blog_2 from "@/assets/images/blog-2.jpg";
import blog_3 from "@/assets/images/blog-3.jpg";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";

export default async function BlogPage() {
  return (
    <div className="blog">
      <Container>
        <p className="section-subtitle">News & Blogs</p>

        <h2 className="h2 section-title">Latest News Feeds</h2>

        <ul className="blog-list has-scrollbar">
          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <Image
                  src={blog_1}
                  alt="The Most Inspiring Interior Design Of 2021"
                  className="w-100"
                />
              </figure>

              <div className="blog-content">
                <div className="blog-content-top">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="user" />
                        <span>by: Admin</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="tags" />
                        <span>Interior</span>
                      </a>
                    </li>
                  </ul>

                  <h3 className="h3 blog-title">
                    <a href="#">The Most Inspiring Interior Design Of 2021</a>
                  </h3>
                </div>

                <div className="blog-content-bottom">
                  <div className="publish-date">
                    <FaIcon icon="calendar-days" />
                    <time dateTime="2022-27-04">Apr 27, 2022</time>
                  </div>

                  <a href="#" className="read-more-btn">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <Image
                  src={blog_2}
                  alt="Recent Commercial Real Estate Transactions"
                  className="w-100"
                />
              </figure>

              <div className="blog-content">
                <div className="blog-content-top">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="user" />

                        <span>by: Admin</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="tags" />

                        <span>Estate</span>
                      </a>
                    </li>
                  </ul>

                  <h3 className="h3 blog-title">
                    <a href="#">Recent Commercial Real Estate Transactions</a>
                  </h3>
                </div>

                <div className="blog-content-bottom">
                  <div className="publish-date">
                    <FaIcon icon="calendar-days" />
                    <time dateTime="2022-27-04">Apr 27, 2022</time>
                  </div>

                  <a href="#" className="read-more-btn">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <Image
                  src={blog_3}
                  alt="Renovating a Living Room? Experts Share Their Secrets"
                  className="w-100"
                />
              </figure>

              <div className="blog-content">
                <div className="blog-content-top">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="user" />

                        <span>by: Admin</span>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-meta-link">
                        <FaIcon icon="tags" />

                        <span>Room</span>
                      </a>
                    </li>
                  </ul>

                  <h3 className="h3 blog-title">
                    <a href="#">
                      Renovating a Living Room? Experts Share Their Secrets
                    </a>
                  </h3>
                </div>

                <div className="blog-content-bottom">
                  <div className="publish-date">
                    <FaIcon icon="calendar-days" />

                    <time dateTime="2022-27-04">Apr 27, 2022</time>
                  </div>

                  <a href="#" className="read-more-btn">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Container>
    </div>
  );
}
