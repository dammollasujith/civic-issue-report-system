import type { ComponentProps } from "react";
import { clsx } from "clsx";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "glass rounded-3xl p-6 shadow-soft transition",
        "text-slate-900 dark:text-slate-100",
        className
      )}
    />
  );
}

