"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import "../styles/theme-toggle.css"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="theme-toggle">
      <button className="theme-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <Sun className="theme-icon sun-icon" />
        <Moon className="theme-icon moon-icon" />
        <span className="sr-only">Toggle theme</span>
      </button>
      {isOpen && (
        <div className="theme-dropdown">
          <button
            className="theme-dropdown-item"
            onClick={() => {
              setTheme("light")
              setIsOpen(false)
            }}
          >
            Light
          </button>
          <button
            className="theme-dropdown-item"
            onClick={() => {
              setTheme("dark")
              setIsOpen(false)
            }}
          >
            Dark
          </button>
          <button
            className="theme-dropdown-item"
            onClick={() => {
              setTheme("system")
              setIsOpen(false)
            }}
          >
            System
          </button>
        </div>
      )}
    </div>
  )
}
