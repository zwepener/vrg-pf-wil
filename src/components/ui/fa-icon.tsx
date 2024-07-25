import { cn } from "@/lib/utils";

type Variants = "solid" | "regular" | "light" | "thin" | "brands";

const FaIcon = ({
  icon,
  variant = "solid",
  className,
}: {
  icon: string;
  variant?: Variants;
  className?: string;
}) => <i className={cn("fa-icon", "block", "pointer-events-none", "fa-" + variant, "fa-" + icon, className)} />;

export default FaIcon;
