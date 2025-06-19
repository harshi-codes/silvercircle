"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BookOpen,
  Utensils,
  Flower,
  Palette,
  Music,
  Camera,
  Gamepad2,
  Plane,
  Dumbbell,
  Laptop,
  Heart,
  Users,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateCirclePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    isOnline: false,
    isPrivate: false,
    welcomeMessage: "",
    rules: "",
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Create New Circle",
      subtitle: "Start your own community around shared interests",
      backToCircles: "Back to Circles",
      circleName: "Circle Name",
      circleNamePlaceholder: "Enter a friendly name for your circle",
      description: "Description",
      descriptionPlaceholder: "What is your circle about? What will members do together?",
      category: "Category",
      selectCategory: "Select a category",
      location: "Location",
      locationPlaceholder: "Where will you meet? (Optional)",
      onlineCircle: "This is an online-only circle",
      privateCircle: "Make this circle private (invite-only)",
      welcomeMessage: "Welcome Message",
      welcomeMessagePlaceholder: "What would you like to say to new members?",
      rules: "Circle Guidelines",
      rulesPlaceholder: "Any rules or guidelines for your circle? (Optional)",
      createCircle: "Create Circle",
      cancel: "Cancel",
      categories: {
        reading: "Reading & Literature",
        cooking: "Cooking & Recipes",
        gardening: "Gardening",
        arts: "Arts & Crafts",
        music: "Music",
        photography: "Photography",
        games: "Games & Puzzles",
        travel: "Travel & Adventure",
        fitness: "Health & Fitness",
        technology: "Technology",
      },
    },
    hi: {
      title: "नया मंडल बनाएं",
      subtitle: "साझा रुचियों के आसपास अपना समुदाय शुरू करें",
      backToCircles: "मंडलों पर वापस जाएं",
      circleName: "मंडल का नाम",
      circleNamePlaceholder: "अपने मंडल के लिए एक मित्रवत नाम दर्ज करें",
      description: "विवरण",
      descriptionPlaceholder: "आपका मंडल किस बारे में है? सदस्य एक साथ क्या करेंगे?",
      category: "श्रेणी",
      selectCategory: "एक श्रेणी चुनें",
      location: "स्थान",
      locationPlaceholder: "आप कहाँ मिलेंगे? (वैकल्पिक)",
      onlineCircle: "यह केवल ऑनलाइन मंडल है",
      privateCircle: "इस मंडल को निजी बनाएं (केवल आमंत्रण)",
      welcomeMessage: "स्वागत संदेश",
      welcomeMessagePlaceholder: "आप नए सदस्यों से क्या कहना चाहेंगे?",
      rules: "मंडल दिशानिर्देश",
      rulesPlaceholder: "आपके मंडल के लिए कोई नियम या दिशानिर्देश? (वैकल्पिक)",
      createCircle: "मंडल बनाएं",
      cancel: "रद्द करें",
      categories: {
        reading: "पढ़ना और साहित्य",
        cooking: "खाना पकाना और व्यंजन",
        gardening: "बागवानी",
        arts: "कला और शिल्प",
        music: "संगीत",
        photography: "फोटोग्राफी",
        games: "खेल और पहेलियां",
        travel: "यात्रा और रोमांच",
        fitness: "स्वास्थ्य और फिटनेस",
        technology: "तकनीक",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  const categoryIcons = {
    reading: BookOpen,
    cooking: Utensils,
    gardening: Flower,
    arts: Palette,
    music: Music,
    photography: Camera,
    games: Gamepad2,
    travel: Plane,
    fitness: Dumbbell,
    technology: Laptop,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating circle:", formData)
    // Redirect to circles page
    router.push("/circles")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-purple-50 to-orange-50"}`}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />

      <VoiceNavigation enabled={voiceEnabled} language={language} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" className="mb-4 text-purple-600 border-purple-600 hover:bg-purple-50" asChild>
              <Link href="/circles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToCircles}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.subtitle}</p>
          </div>

          {/* Form */}
          <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <Heart className="w-8 h-8 text-purple-600 mr-3" />
                Create Your Circle
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Circle Name */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.circleName} *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t.circleNamePlaceholder}
                    className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.description} *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                    className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[120px]"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.category} *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                      <SelectValue placeholder={t.selectCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.categories).map(([key, value]) => {
                        const IconComponent = categoryIcons[key as keyof typeof categoryIcons]
                        return (
                          <SelectItem key={key} value={key} className="text-lg py-3">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5" />
                              <span>{value}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.location}
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder={t.locationPlaceholder}
                    className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                    disabled={formData.isOnline}
                  />
                </div>

                {/* Options */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isOnline"
                      checked={formData.isOnline}
                      onCheckedChange={(checked) => {
                        handleInputChange("isOnline", checked as boolean)
                        if (checked) {
                          handleInputChange("location", "")
                        }
                      }}
                      className="w-5 h-5"
                    />
                    <Label
                      htmlFor="isOnline"
                      className="text-lg font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {t.onlineCircle}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isPrivate"
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => handleInputChange("isPrivate", checked as boolean)}
                      className="w-5 h-5"
                    />
                    <Label
                      htmlFor="isPrivate"
                      className="text-lg font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {t.privateCircle}
                    </Label>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="space-y-3">
                  <Label htmlFor="welcomeMessage" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.welcomeMessage}
                  </Label>
                  <Textarea
                    id="welcomeMessage"
                    value={formData.welcomeMessage}
                    onChange={(e) => handleInputChange("welcomeMessage", e.target.value)}
                    placeholder={t.welcomeMessagePlaceholder}
                    className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px]"
                  />
                </div>

                {/* Rules */}
                <div className="space-y-3">
                  <Label htmlFor="rules" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.rules}
                  </Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => handleInputChange("rules", e.target.value)}
                    placeholder={t.rulesPlaceholder}
                    className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 text-lg py-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    {t.createCircle}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/circles")}
                    className="flex-1 text-lg py-4 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
