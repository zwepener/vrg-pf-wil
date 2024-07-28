import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Container = async ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "px-[15px] sm:max-w-[550px] sm:mx-auto md:max-w-[720px] lg:max-w-[970px] xl:max-w-[1200px]",
      className
    )}
  >
    {children}
  </div>
);

export default Container;
