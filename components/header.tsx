"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Mic, MicOff, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import "@fontsource/grand-hotel"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  language: string
  setLanguage: (value: string) => void
  voiceEnabled: boolean
  setVoiceEnabled: (value: boolean) => void
}

export function Header({ darkMode, setDarkMode, language, setLanguage, voiceEnabled, setVoiceEnabled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = {
    en: [
      { href: "/", label: "Home" },
      { href: "/features", label: "Features" },
      { href: "/circles", label: "Circles" },
      { href: "/vr-memories", label: "VR Memories" },
      { href: "/games", label: "Games" },
      { href: "/about", label: "About" },
      { href: "/my-profile", label: "My Profile" },
      { href: "/profile", label: "Join Us" },
    ],
    hi: [
      { href: "/", label: "होम" },
      { href: "/features", label: "विशेषताएं" },
      { href: "/circles", label: "मंडल" },
      { href: "/vr-memories", label: "VR यादें" },
      { href: "/games", label: "खेल" },
      { href: "/about", label: "हमारे बारे में" },
      { href: "/my-profile", label: "मेरी प्रोफ़ाइल" },
      { href: "/profile", label: "शामिल हों" },
    ],
  }

  const currentNavItems = navItems[language as keyof typeof navItems]

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="SilverCircle" width={50} height={50} className="rounded-full opacity-90" />
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400" style={{ fontFamily: '"Grand Hotel", cursive' }}>SilverCircle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="hi">हिं</SelectItem>
              </SelectContent>
            </Select>

            {/* Voice Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="p-2"
              title={voiceEnabled ? "Disable Voice Navigation" : "Enable Voice Navigation"}
            >
              {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-3">
              {currentNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
