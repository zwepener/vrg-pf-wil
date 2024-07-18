import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Container = async ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <div className={cn("container", className)}>{children}</div>;

export default Container;
