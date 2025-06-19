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
import { User, Mail, Phone, MapPin, Heart, Shield } from "lucide-react"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    interests: "",
    bio: "",
    isVolunteer: false,
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
      welcome: "Welcome to SilverCircle",
      loginTitle: "Sign In to Your Account",
      signupTitle: "Join Our Community",
      loginSubtitle: "Welcome back! We're happy to see you again.",
      signupSubtitle: "Create your account and start connecting with amazing people.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      age: "Age",
      location: "Location",
      interests: "Interests & Hobbies",
      bio: "Tell us about yourself",
      volunteer: "I want to be a verified volunteer",
      volunteerDesc: "Help other seniors navigate the platform",
      login: "Sign In",
      signup: "Create Account",
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: "Already have an account? Sign in",
      privacy: "Your privacy and security are our top priority",
      verified: "All profiles are verified for your safety",
    },
    hi: {
      welcome: "सिल्वरसर्कल में आपका स्वागत है",
      loginTitle: "अपने खाते में साइन इन करें",
      signupTitle: "हमारे समुदाय में शामिल हों",
      loginSubtitle: "वापस आपका स्वागत है! हमें आपको फिर से देखकर खुशी हुई।",
      signupSubtitle: "अपना खाता बनाएं और अद्भुत लोगों से जुड़ना शुरू करें।",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      age: "उम्र",
      location: "स्थान",
      interests: "रुचियां और शौक",
      bio: "अपने बारे में बताएं",
      volunteer: "मैं एक सत्यापित स्वयंसेवक बनना चाहता हूं",
      volunteerDesc: "अन्य वरिष्ठ नागरिकों को प्लेटफॉर्म नेविगेट करने में मदद करें",
      login: "साइन इन करें",
      signup: "खाता बनाएं",
      switchToSignup: "खाता नहीं है? साइन अप करें",
      switchToLogin: "पहले से खाता है? साइन इन करें",
      privacy: "आपकी गोपनीयता और सुरक्षा हमारी सर्वोच्च प्राथमिकता है",
      verified: "आपकी सुरक्षा के लिए सभी प्रोफाइल सत्यापित हैं",
    },
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.welcome}</h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>{t.privacy}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>{t.verified}</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {isLogin ? t.loginTitle : t.signupTitle}
              </CardTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {isLogin ? t.loginSubtitle : t.signupSubtitle}
              </p>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {t.name}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {t.phone}
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {t.age}
                        </Label>
                        <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                          <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50-60">50-60</SelectItem>
                            <SelectItem value="60-70">60-70</SelectItem>
                            <SelectItem value="70-80">70-80</SelectItem>
                            <SelectItem value="80+">80+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {t.location}
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="location"
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {t.interests}
                      </Label>
                      <Input
                        id="interests"
                        type="text"
                        value={formData.interests}
                        onChange={(e) => handleInputChange("interests", e.target.value)}
                        className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                        placeholder="Gardening, Reading, Cooking..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {t.bio}
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px]"
                        placeholder="Share a bit about yourself..."
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="volunteer"
                        checked={formData.isVolunteer}
                        onCheckedChange={(checked) => handleInputChange("isVolunteer", checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <Label
                          htmlFor="volunteer"
                          className="text-lg font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {t.volunteer}
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.volunteerDesc}</p>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full text-lg py-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isLogin ? t.login : t.signup}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-lg text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {isLogin ? t.switchToSignup : t.switchToLogin}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
