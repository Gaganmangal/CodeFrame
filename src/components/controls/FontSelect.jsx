// Font options (font name, id, etc.)
import { fonts } from "@/options"

// UI components for custom select dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

// Zustand global store se state access/update karne ke liye
import useStore from "@/store"

export default function FontSelect() {
  // Store se current selected font style le rahe hain
  const fontStyle = useStore((state) => state.fontStyle)

  return (
    <div>
      {/* Label for the dropdown */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font
      </label>

      {/* Dropdown box for font selection */}
      <Select
        value={fontStyle} // current selected font
        onValueChange={(fontStyle) =>
          useStore.setState({ fontStyle }) // font change hone par state update
        }
      >
        {/* Trigger button that opens dropdown */}
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>

        {/* Dropdown items list */}
        <SelectContent className="dark max-h-[500px]">
          {/* fonts object ko map karke har font ek dropdown item banaya */}
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name} {/* Display font ka naam */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
