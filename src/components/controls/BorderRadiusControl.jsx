

// Global state access karne ke liye Zustand store se
import useStore from "@/store"
// Custom styled slider component
import { Slider } from "../ui/slider"

export default function BorderRadiusControl() {
  // Current padding value store se le rahe hain
  const borderRadius = useStore((state) => state.borderRadius)
  return (
    <div>
      {/* Slider ke upar label text */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
      BorderRadius
      </label>

      {/* Slider component */}
      <Slider
        className="w-44 my-5"             // Slider ki width aur vertical spacing
        value={[borderRadius]}                 // Slider ka current value (array me pass karna hota hai)
        onValueChange={([borderRadius]) =>     // Jab user slider ko move kare
          useStore.setState({ borderRadius })  // Global state update karo
        }
        max={13}                         // Max padding 128px
        step={1}                          // 8px ke step me badhe
      />
    </div>
  )
}
