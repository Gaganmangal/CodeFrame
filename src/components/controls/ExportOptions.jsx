// Radix icons import (share, copy, download etc.)
import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons"

// Button component
import { Button } from "../ui/button"

// Dropdown menu ke UI components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

// html-to-image se DOM element ko PNG, SVG, Blob me convert karne ke tools
import { toBlob, toPng, toSvg } from "html-to-image"

// Toast notifications
import { toast } from "react-hot-toast"

// Zustand store
import useStore from "@/store"

// Keyboard shortcuts handle karne ke liye
import { useHotkeys } from "react-hotkeys-hook"

export default function ExportOptions({ targetRef }) {
  const title = useStore((state) => state.title)

  // ✅ Copy image to clipboard
  const copyImage = async () => {
    const loading = toast.loading("Copying...")

    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      })
      const img = new ClipboardItem({ "image/png": imgBlob })
      navigator.clipboard.write([img])

      toast.remove(loading)
      toast.success("Image copied to clipboard!")
    } catch (error) {
      toast.remove(loading)
      toast.error("Something went wrong!")
    }
  }

  // ✅ Copy link with encoded state
  const copyLink = () => {
    try {
      const state = useStore.getState()
      const queryParams = new URLSearchParams({
        ...state,
        code: btoa(state.code), // base64 encode code
      }).toString()

      navigator.clipboard.writeText(`${location.href}?${queryParams}`)

      toast.success("Link copied to clipboard!")
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  // ✅ Save image to local device
  const saveImage = async (name, format) => {
    const loading = toast.loading(`Exporting ${format} image...`)

    try {
      let imgUrl, filename
      switch (format) {
        case "PNG":
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 })
          filename = `${name}.png`
          break
        case "SVG":
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 })
          filename = `${name}.svg`
          break
        default:
          return
      }

      const a = document.createElement("a")
      a.href = imgUrl
      a.download = filename
      a.click()

      toast.remove(loading)
      toast.success("Exported successfully!")
    } catch (error) {
      toast.remove(loading)
      toast.error("Something went wrong!")
    }
  }

  // ✅ Keyboard shortcuts
  useHotkeys("ctrl+c", copyImage)
  useHotkeys("shift+ctrl+c", copyLink)
  useHotkeys("ctrl+s", () => saveImage(title, "PNG"))
  useHotkeys("shift+ctrl+s", () => saveImage(title, "SVG"))

  return (
    <DropdownMenu>
      {/* Trigger button: Export */}
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown content with export options */}
      <DropdownMenuContent className="dark">
        {/* Copy image to clipboard */}
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Copy shareable link */}
        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Save as PNG */}
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "PNG")}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Save as SVG */}
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "SVG")}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
