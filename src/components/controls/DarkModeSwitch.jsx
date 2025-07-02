// Global Zustand store se state access karne ke liye
import useStore from "@/store"
// UI ke liye custom Switch component
import { Switch } from "../ui/switch"

export default function DarkModeSwitch() {
  // Store se darkMode value le rahe hain (true ya false)
  const darkMode = useStore((state) => state.darkMode)

  return (
    <div>
      {/* Switch ke upar label text */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        DarkMode
      </label>

      {/* Switch component jo on/off toggle karta hai */}
      <Switch
        checked={darkMode} // Agar darkMode on hai to switch ON dikhega
        onCheckedChange={(checked) =>
          // Jab switch toggle ho, tab darkMode value update karo store me
          useStore.setState({ darkMode: checked })
        }
        className="my-1.5" // Switch ke top-bottom me thoda margin
      />
    </div>
  )
}
