import { cva } from "class-variance-authority";

export const inputStyles = cva(
  "rounded-lg bg-light-300 text-2xl text-dark-100 ring-offset-white transition-colors placeholder:text-lg placeholder:text-dark-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-1 dark:bg-dark-300 dark:text-light-100 dark:ring-offset-slate-950 dark:placeholder:text-light-100/50 dark:focus-visible:ring-primary-dark",
  {
    variants: {
      dimension: {
        medium: "rounded-md px-7 py-5",
        small: "py-1.5",
      },
    },
    defaultVariants: {
      dimension: "medium",
    },
  },
);
