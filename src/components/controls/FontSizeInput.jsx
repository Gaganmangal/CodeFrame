// Global state (Zustand) access karne ke liye
import useStore from "@/store"
// Custom styled input box
import { Input } from "../ui/input"

export default function FontSizeInput() {
  // Global store se current font size le rahe hain
  const fontSize = useStore((state) => state.fontSize)

  return (
    <div>
      {/* Input ke upar label text */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font Size
      </label>

      {/* Number input box for font size */}
      <Input
        type="number"               // sirf number input allow karega
        className="!dark w-16 bg-transparent" // styling: dark mode, fixed width
        min={6}                     // minimum font size allowed
        value={fontSize}           // current value
        onChange={(e) =>
          // User ne input change kiya to global state update kar do
          useStore.setState({ fontSize: Number(e.target.value) })
        }
      />
    </div>
  )
}
