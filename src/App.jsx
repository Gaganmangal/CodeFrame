// React ke built-in hooks import kar rahe hain
import { useEffect, useRef, useState } from "react"

// Code editor component
import CodeEditor from "./components/CodeEditor"

// Utility function for classNames
import { cn } from "./lib/utils"

// Fonts aur themes ke options
import { fonts, themes } from "./options"

// Global state management ke liye custom store
import useStore from "./store"

// UI components
import { Card, CardContent } from "./components/ui/card"
import ExportOptions from "./components/controls/ExportOptions"
import ThemeSelect from "./components/controls/ThemeSelect"
import LanguageSelect from "./components/controls/LanguageSelect"
import FontSelect from "./components/controls/FontSelect"
import FontSizeInput from "./components/controls/FontSizeInput"
import PaddingSlider from "./components/controls/PaddingSlider"
import BackgroundSwitch from "./components/controls/BackgroundSwitch"
import DarkModeSwitch from "./components/controls/DarkModeSwitch"
import BorderRadiusControl from "./components/controls/BorderRadiusControl"
import { Resizable } from "re-resizable" // Resize karne ke liye external package
import { Button } from "./components/ui/button"
import { ResetIcon } from "@radix-ui/react-icons"
import WidthMeasurement from "./components/WidthMeasurement" // Width ka live measure dikhata hai

function App() {
  // Editor ki width ke liye state
  const [width, setWidth] = useState("auto")
  // Width indicator dikhana ya nahi uske liye state
  const [showWidth, setShowWidth] = useState(false)

  // Store se current theme, padding, font style, aur background show karna hai ya nahi — yeh sab state le rahe hain
  const theme = useStore((state) => state.theme)
  const padding = useStore((state) => state.padding)
  const fontStyle = useStore((state) => state.fontStyle)
  const showBackground = useStore((state) => state.showBackground)
  const borderRadius = useStore((state) => state.borderRadius)

  // Editor ke DOM element ka reference
  const editorRef = useRef(null)

  // Jab page load hota hai, agar URL me query params hain to unse state update karo
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.size === 0) return

    const state = Object.fromEntries(queryParams)

    // Store ki state update karo decoded values ke saath
    useStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "", // base64 decode
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    })
  }, [])

  return (
    <main className="relative dark min-h-screen flex justify-center items-center bg-neutral-950 text-white">
      <div className="animated-grid-bg"></div>

      {/* Theme aur font ki external stylesheet load kar rahe hain */}
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />

      {/* Editor ko horizontally resize karne wala container */}
      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
        size={{ width }}
        onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
        onResizeStart={() => setShowWidth(true)}
        onResizeStop={() => setShowWidth(false)}
      >
        {/* Code editor ka main container */}
        <div
          className={cn(
            "overflow-hidden mb-2 transition-all ease-out",
            showBackground ? themes[theme].background : "ring ring-neutral-900"
          )}
          style={{ padding, borderRadius: `${borderRadius}px` }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>

        {/* Width kitni hai woh dikha rahe hain */}
        <WidthMeasurement showWidth={showWidth} width={width} />

        {/* Agar width manually set hai to reset button dikhao */}
        <div
          className={cn(
            "transition-opacity w-fit mx-auto -mt-4",
            showWidth || width === "auto"
              ? "invisible opacity-0"
              : "visible opacity-100"
          )}
        >
          <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
            <ResetIcon className="mr-2" />
            Reset width
          </Button>
        </div>
      </Resizable>

      {/* Niche floating control panel for theme, font, size etc. */}
      <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-6 p-0">
          <ThemeSelect />
          <LanguageSelect />
          <FontSelect />
          <FontSizeInput />
          <PaddingSlider />
          <BorderRadiusControl />
          <BackgroundSwitch />
          <DarkModeSwitch />
          {/* Divider line */}
          <div className="w-px bg-neutral-800" />
          {/* Export options */}
          <div className="place-self-center">
            <ExportOptions targetRef={editorRef} />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default App
