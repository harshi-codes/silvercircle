"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { RatingModal } from "@/components/rating-modal"
import { VoiceNavigation } from "@/components/voice-navigation"

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)

  useEffect(() => {
    // Show rating modal after 30 seconds
    const timer = setTimeout(() => {
      setShowRatingModal(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      headline: "Where silver meets soul, connection comes alive.",
      subtitle: "Join a warm community designed for seniors who value meaningful connections and shared experiences.",
      joinCommunity: "Join Our Community",
      learnMore: "Learn More",
      mission: "Our Mission",
      missionText:
        "SilverCircle is dedicated to combating senior loneliness by creating a safe, joyful, and inclusive online community where technology bridges generations with love and dignity.",
      features: "What Makes Us Special",
      nostalgiaRooms: "Decade-based Nostalgia Rooms",
      nostalgiaDesc: "Relive precious memories with peers from your generation",
      hobbyCircles: "Interest-based Hobby Circles",
      hobbyDesc: "Connect with others who share your passions and interests",
      vrMemories: "Immersive VR Memory Lane",
      vrDesc: "Experience nostalgic moments through virtual reality",
      companions: "Go Companions Connect",
      companionsDesc: "Find trusted companions for activities and adventures",
    },
    hi: {
      headline: "जहाँ चाँदी आत्मा से मिलती है, वहाँ रिश्ते जीवंत हो जाते हैं।",
      subtitle: "एक गर्मजोशी भरे समुदाय में शामिल हों जो वरिष्ठ नागरिकों के लिए डिज़ाइन किया गया है।",
      joinCommunity: "हमारे समुदाय में शामिल हों",
      learnMore: "और जानें",
      mission: "हमारा मिशन",
      missionText: "सिल्वरसर्कल वरिष्ठ नागरिकों के अकेलेपन को दूर करने के लिए समर्पित है।",
      features: "हमारी विशेषताएं",
      nostalgiaRooms: "दशक-आधारित नॉस्टेल्जिया रूम",
      nostalgiaDesc: "अपनी पीढ़ी के साथियों के साथ यादों को फिर से जिएं",
      hobbyCircles: "रुचि-आधारित शौक मंडल",
      hobbyDesc: "अपने जुनून साझा करने वाले लोगों से जुड़ें",
      vrMemories: "वर्चुअल रियलिटी मेमोरी लेन",
      vrDesc: "वर्चुअल रियलिटी के माध्यम से यादों का अनुभव करें",
      companions: "साथी कनेक्ट",
      companionsDesc: "गतिविधियों के लिए विश्वसनीय साथी खोजें",
    },
  }

  const t = translations[language as keyof typeof translations]

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
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/logo.png"
              alt="SilverCircle Logo"
              width={120}
              height={120}
              className="mx-auto mb-8 rounded-full shadow-lg"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white leading-tight">
              {t.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/profile">{t.joinCommunity}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/about">{t.learnMore}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl mb-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <Heart className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">{t.mission}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{t.missionText}</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t.features}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.nostalgiaRooms}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.nostalgiaDesc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.hobbyCircles}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.hobbyDesc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.vrMemories}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.vrDesc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.companions}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.companionsDesc}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of seniors who have found their community at SilverCircle
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/profile">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <RatingModal isOpen={showRatingModal} onClose={() => setShowRatingModal(false)} language={language} />
    </div>
  )
}
