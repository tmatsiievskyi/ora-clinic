import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cnm = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
