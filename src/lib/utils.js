// clsx: Conditionally join class names (falsy values ko ignore karta hai)
// twMerge: Tailwind ke conflicting classes ko intelligently merge karta hai
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ✅ Custom `cn` (className) utility function
export function cn(...inputs) {
  // clsx se class names combine karo, aur twMerge se Tailwind conflicts resolve karo
  return twMerge(clsx(inputs))
}
