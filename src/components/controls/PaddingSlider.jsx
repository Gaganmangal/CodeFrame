// Global state access karne ke liye Zustand store se
import useStore from "@/store"
// Custom styled slider component
import { Slider } from "../ui/slider"

export default function PaddingSlider() {
  // Current padding value store se le rahe hain
  const padding = useStore((state) => state.padding)

  return (
    <div>
      {/* Slider ke upar label text */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>

      {/* Slider component */}
      <Slider
        className="w-44 my-5"             // Slider ki width aur vertical spacing
        value={[padding]}                 // Slider ka current value (array me pass karna hota hai)
        onValueChange={([padding]) =>     // Jab user slider ko move kare
          useStore.setState({ padding })  // Global state update karo
        }
        max={128}                         // Max padding 128px
        step={8}                          // 8px ke step me badhe
      />
    </div>
  )
}
