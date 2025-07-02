// Global state (Zustand) se access karne ke liye
import useStore from "@/store"
// UI ke liye custom Switch component
import { Switch } from "../ui/switch"

export default function BackgroundSwitch() {
  // Store se current background state le rahe hain (on/off)
  const showBg = useStore((state) => state.showBackground)

  return (
    <div>
      {/* Label text for the switch */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Background
      </label>

      {/* Toggle switch: background enable/disable karne ke liye */}
      <Switch
        checked={showBg} // Agar background on hai to switch ON dikhega
        onCheckedChange={(checked) =>
          // Jab user switch toggle kare, tab global state update karo
          useStore.setState({ showBackground: checked })
        }
        className="my-1.5" // Top-bottom spacing
      />
    </div>
  )
}
