"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceNavigationProps {
  enabled: boolean
  language: string
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export function VoiceNavigation({ enabled, language }: VoiceNavigationProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = language === "hi" ? "hi-IN" : "en-US"

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [language])

  const handleVoiceCommand = (command: string) => {
    const commands = {
      en: {
        home: "/",
        "go home": "/",
        features: "/features",
        circles: "/circles",
        "hobby circles": "/circles",
        about: "/about",
        "about us": "/about",
        profile: "/profile",
        join: "/profile",
        "sign up": "/profile",
      },
      hi: {
        होम: "/",
        "घर जाओ": "/",
        विशेषताएं: "/features",
        मंडल: "/circles",
        "शौक मंडल": "/circles",
        "हमारे बारे में": "/about",
        प्रोफाइल: "/profile",
        "शामिल हों": "/profile",
      },
    }

    const currentCommands = commands[language as keyof typeof commands]

    for (const [phrase, path] of Object.entries(currentCommands)) {
      if (command.includes(phrase)) {
        router.push(path)
        break
      }
    }
  }

  const startListening = () => {
    if (recognition && enabled) {
      setIsListening(true)
      recognition.start()
    }
  }

  if (!enabled) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={startListening}
        disabled={isListening}
        className={`w-16 h-16 rounded-full shadow-lg ${
          isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-purple-600 hover:bg-purple-700"
        } text-white`}
        title={isListening ? "Listening..." : "Click to speak"}
      >
        {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
      </Button>
    </div>
  )
}
