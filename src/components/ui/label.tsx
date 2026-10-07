import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium", className)} {...props} />;
}
