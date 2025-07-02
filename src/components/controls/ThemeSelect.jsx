// Theme options (theme name, background class, etc.)
import { themes } from "@/options"

// Custom Select Dropdown components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

// Tailwind classes ko smartly combine karne ke liye utility
import { cn } from "@/lib/utils"

// Zustand store se global state access
import useStore from "@/store"

export default function ThemeSelect() {
  // Store se selected theme ka naam le rahe hain
  const theme = useStore((state) => state.theme)

  return (
    <div>
      {/* Label for the dropdown */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Theme
      </label>

      {/* Theme select dropdown */}
      <Select
        value={theme} // Current selected theme
        onValueChange={(theme) => useStore.setState({ theme })} // Change hone par store update
      >
        {/* Trigger button that opens dropdown */}
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>

        {/* Dropdown options */}
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem key={name} value={name}>
              <div className="flex gap-2 items-center">
                {/* Theme ka background preview circle */}
                <div className={cn("h-4 w-4 rounded-full", theme.background)} />
                {/* Theme ka naam, first letter capital */}
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
