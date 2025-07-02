// Language aur theme options import kiye (dropdown ke liye)
import { languages, themes } from "@/options"

// Custom select dropdown components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

// Conditional class joiner
import { cn } from "@/lib/utils"

// Global Zustand state
import useStore from "@/store"

// Auto detect icon
import { MagicWandIcon } from "@radix-ui/react-icons"

export default function LanguageSelect() {
  // Store se selected language aur auto-detect flag le rahe hain
  const language = useStore((state) => state.language)
  const autoDetectLanguage = useStore((state) => state.autoDetectLanguage)

  // Language change hone par handle karne wala function
  const handleChange = (language) => {
    if (language === "auto-detect") {
      // Agar user Auto Detect select karta hai
      useStore.setState({ autoDetectLanguage: true, language: "plaintext" })
    } else {
      // Agar user specific language select karta hai
      useStore.setState({ autoDetectLanguage: false, language })
    }
  }

  return (
    <div>
      {/* Dropdown ke upar label */}
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>

      {/* Dropdown for language selection */}
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {/* Agar auto detect on hai to magic wand icon dikhao */}
          {autoDetectLanguage && <MagicWandIcon className="mr-2" />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>

        <SelectContent className="dark max-h-[500px]">
          {/* Pehla option: Auto Detect */}
          <SelectItem value="auto-detect">Auto Detect</SelectItem>

          {/* Baki sari programming languages list karo */}
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
