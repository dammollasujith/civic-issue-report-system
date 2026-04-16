import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-blue/20 placeholder:text-slate-400 shadow-sm transition focus:ring-4 dark:border-slate-700/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500",
        className
      )}
    />
  );
});

