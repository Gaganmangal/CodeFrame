// Utility function for class names
import { cn } from "@/lib/utils"

// Code snippets aur font options
import { codeSnippets, fonts } from "@/options"

// Zustand store se state access karne ke liye
import useStore from "@/store"

// Language detection ke liye Flourite aur syntax highlighting ke liye highlight.js
import flourite from "flourite"
import hljs from "highlight.js"

// React ke hooks aur code editor component
import { useEffect } from "react"
import Editor from "react-simple-code-editor"

export default function CodeEditor() {
  const store = useStore() // Global store se data le rahe hain

  // ✅ Component mount hone par ek random code snippet load karna
  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    useStore.setState(randomSnippet)
  }, [])

  // ✅ Auto language detection (agar enabled ho)
  useEffect(() => {
    if (store.autoDetectLanguage) {
      const { language } = flourite(store.code, { noUnknown: true })
      useStore.setState({
        language: language.toLowerCase() || "plaintext",
      })
    }
  }, [store.autoDetectLanguage, store.code])

  return (
    <div
      className={cn(
        "min-w-[400px] border-2 rounded-xl shadow-2xl",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
    >
      {/* ✅ Editor ka top header with colored buttons and title input */}
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        {/* Fake Mac-style window buttons (red, yellow, green) */}
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500" />
          <div className="rounded-full h-3 w-3 bg-yellow-500" />
          <div className="rounded-full h-3 w-3 bg-green-500" />
        </div>

        {/* Title input field (center aligned) */}
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) => useStore.setState({ title: e.target.value })}
            spellCheck={false}
            onClick={(e) => e.target.select()}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>

      {/* ✅ Code editor area */}
      <div
        className={cn(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110" // Dark mode me thoda bright karna
            : "text-gray-800 brightness-50 saturate-200 contrast-200" // Light mode ke liye styling
        )}
      >
        <Editor
          value={store.code} // Current code
          onValueChange={(code) => useStore.setState({ code })} // Code update karne par store update
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" })
              .value
          } // Syntax highlighting
          style={{
            fontFamily: fonts[store.fontStyle].name, // Custom font
            fontSize: store.fontSize, // Custom font size
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()} // Click karte hi pura code select ho jaaye
        />
      </div>
    </div>
  )
}
