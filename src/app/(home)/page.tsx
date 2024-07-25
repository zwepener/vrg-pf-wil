"use server";

import HeroBanner from "@/assets/images/hero-banner.png";
import Container from "@/components/ui/container";
import FaIcon from "@/components/ui/fa-icon";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="bg-[hsl(210,40%,95%)] py-[100px]">
        <Container className="grid grid-cols-2 items-center">
          <div className="mb-[60px] md:max-w-[400px] lg:max-w-none lg:mb-0">
            <p className="flex justify-start items-center gap-[5px] mb-5">
              <FaIcon icon="house" className="text-[hsl(20,100%,65%)]" />
              <span className="text-[hsl(160,60%,15%)] text-sm font-bold">
                A Real Estate Listing Platform
              </span>
            </p>
            <h2 className="mb-5 text-[hsl(160,60%,15%)] text-3xl md:text-4xl lg:text-5xl">
              Find Your Dream House By Us
            </h2>
            <p className="text-[hsl(220,30%,50%)] text-sm md:text-base pl-[15px] border-solid border-l-[1px] border-l-[rgb(89,115,166)] mb-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <Link
              href="/contact"
              className="before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white before:transition-all before:duration-250 before:ease-in before:z-[-1] hover:bg-black focus:bg-black hover:text-[hsl(160,60%,15%)] focus:text-[hsl(160,60%,15%)] hover:border-black focus:border-black font-sans before:hover:w-full before:focus:w-full lg:py-4 lg:px-10 md:py-3 md:px-7 border border-[hsl(20,100%,65%)] bg-[hsl(20,100%,65%)] text-white relative py-[10px] px-5 z-[1] text-sm md:text-base w-56"
            >
              Make An Enquiry
            </Link>
          </div>
          <figure>
            <Image
              src={HeroBanner}
              alt="Modern house model"
              className="w-100"
            />
          </figure>
        </Container>
      </div>
      <div className="bg-[linear-gradient(to_bottom,white_50%,hsl(240,30%,20%)_50%)]">
        <Container>
          <div className="bg-[hsl(20,100%,65%)] py-[50px] px-[25px] shadow-[0_16px_32px_hsla(188,63%,7%,0.1)] sm:text-2xl md:text-2xl lg:text-3xl lg:flex lg:justify-between lg:items-center lg:p-[50px] xl:text-4xl xl:px-[60px]">
            <div className="max-w-max mx-auto mb-[30px] lg:m-0">
              <h2 className="text-2xl sm:text-3xl xl:text-4xl text-white">
                Looking for a dream home?
              </h2>

              <p className="text-white leading-5 mb-[15px] text-base">
                We can help you realize your dream of a new home
              </p>
            </div>

            <Link
              href="/properties"
              className="before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white before:transition-all before:duration-250 before:ease-in before:z-[-1] hover:bg-black focus:bg-black hover:text-[hsl(160,60%,15%)] focus:text-[hsl(160,60%,15%)] hover:border-black focus:border-black font-sans before:hover:w-full before:focus:w-full lg:py-4 lg:px-10 md:py-3 md:px-7 md:text-base text-sm relative z-[1] py-[10px] px-5 flex items-center gap-[10px] text-white bg-black shadow-[0_16px_32px_hsla(188,63%,7%,0.1)] border-white mx-auto hover:bg-none focus:bg-none hover:border-transparent focus:border-transparent lg:m-0"
            >
              <span>Explore Properties</span>
              <FaIcon icon="arrow-right-long" />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
