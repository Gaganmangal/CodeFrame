// Utility function for conditionally joining class names
import { cn } from "@/lib/utils"

export default function WidthMeasurement({ showWidth, width }) {
  return (
    <div
      className={cn(
        // Full width line, center me width show hoti hai
        "w-full flex gap-2 items-center text-white transition-opacity",
        showWidth ? "visible opacity-100" : "invisible opacity-0" // Show/hide based on prop
      )}
    >
      {/* Left line part */}
      <div className="flex-1 flex items-center">
        <div className="h-4 w-0.5 bg-white/20" /> {/* Vertical line */}
        <div className="h-px w-full bg-white/20" /> {/* Horizontal line */}
      </div>

      {/* Center me width text — e.g., 820 px */}
      <span className="text-neutral-500 text-sm">{width} px</span>

      {/* Right line part */}
      <div className="flex-1 flex items-center">
        <div className="h-px w-full bg-white/20" /> {/* Horizontal line */}
        <div className="h-4 w-0.5 bg-white/20" /> {/* Vertical line */}
      </div>
    </div>
  )
}
