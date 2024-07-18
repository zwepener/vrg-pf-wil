import hero_banner from "@/assets/images/hero-banner.png";
import logo_dark from "@/assets/images/logo.png";
import logo_light from "@/assets/images/logo-light.png";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  variant,
  className,
}: {
  variant: "light" | "dark";
  className?: string;
}) => (
  <Link href="/" className="logo">
    <Image
      src={variant === "dark" ? logo_dark : logo_light}
      alt="RealHome logo"
    />
  </Link>
);

export const HeroBanner = ({ className }: { className?: string }) => (
  <figure className="hero-banner">
    <Image src={hero_banner} alt="Modern house model" className="w-100" />
  </figure>
);
