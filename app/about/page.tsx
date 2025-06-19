"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Target, Eye, Users, Shield, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "About SilverCircle",
      subtitle: "Bridging generations with love, dignity, and technology",
      vision: "Our Vision",
      visionText:
        "A world where technology bridges generations with love and dignity, ensuring no senior feels isolated or forgotten.",
      mission: "Our Mission",
      missionText:
        "To create a safe, joyful, and inclusive online community for seniors that combats loneliness and celebrates the wisdom of age.",
      values: "Our Values",
      compassion: "Compassion",
      compassionDesc: "Every interaction is guided by empathy and understanding",
      dignity: "Dignity",
      dignityDesc: "Respecting the wisdom and experience of every member",
      safety: "Safety",
      safetyDesc: "Creating a secure environment where seniors can connect freely",
      inclusion: "Inclusion",
      inclusionDesc: "Welcoming seniors from all backgrounds and walks of life",
      innovation: "Innovation",
      innovationDesc: "Using technology to enhance, not complicate, connections",
      community: "Community",
      communityDesc: "Building lasting friendships and meaningful relationships",
      story: "Our Story",
      storyText:
        "SilverCircle was born from a simple observation: while technology connects the world, many seniors feel more isolated than ever. We believe that with the right approach, technology can be a bridge, not a barrier. Our platform is designed specifically for seniors, with large fonts, simple navigation, and features that matter most to this incredible generation.",
      joinUs: "Join Our Community",
    },
    hi: {
      title: "सिल्वरसर्कल के बारे में",
      subtitle: "प्रेम, गरिमा और तकनीक के साथ पीढ़ियों को जोड़ना",
      vision: "हमारा दृष्टिकोण",
      visionText: "एक ऐसी दुनिया जहाँ तकनीक प्रेम और गरिमा के साथ पीढ़ियों को जोड़ती है।",
      mission: "हमारा मिशन",
      missionText: "वरिष्ठ नागरिकों के लिए एक सुरक्षित, खुशी से भरा और समावेशी ऑनलाइन समुदाय बनाना।",
      values: "हमारे मूल्य",
      compassion: "करुणा",
      compassionDesc: "हर बातचीत सहानुभूति और समझ से निर्देशित होती है",
      dignity: "गरिमा",
      dignityDesc: "हर सदस्य की बुद्धिमत्ता और अनुभव का सम्मान",
      safety: "सुरक्षा",
      safetyDesc: "एक सुरक्षित वातावरण बनाना जहाँ वरिष्ठ नागरिक स्वतंत्र रूप से जुड़ सकें",
      inclusion: "समावेशन",
      inclusionDesc: "सभी पृष्ठभूमि के वरिष्ठ नागरिकों का स्वागत",
      innovation: "नवाचार",
      innovationDesc: "कनेक्शन को बढ़ाने के लिए तकनीक का उपयोग",
      community: "समुदाय",
      communityDesc: "स्थायी मित्रता और अर्थपूर्ण रिश्ते बनाना",
      story: "हमारी कहानी",
      storyText:
        "सिल्वरसर्कल एक सरल अवलोकन से जन्मा: जबकि तकनीक दुनिया को जोड़ती है, कई वरिष्ठ नागरिक पहले से कहीं अधिक अलग-थलग महसूस करते हैं।",
      joinUs: "हमारे समुदाय में शामिल हों",
    },
  }

  const t = translations[language as keyof typeof translations]

  const values = [
    {
      icon: Heart,
      title: t.compassion,
      description: t.compassionDesc,
      color: "text-red-500",
    },
    {
      icon: Shield,
      title: t.dignity,
      description: t.dignityDesc,
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: t.safety,
      description: t.safetyDesc,
      color: "text-green-600",
    },
    {
      icon: Users,
      title: t.inclusion,
      description: t.inclusionDesc,
      color: "text-blue-600",
    },
    {
      icon: Target,
      title: t.innovation,
      description: t.innovationDesc,
      color: "text-orange-500",
    },
    {
      icon: Globe,
      title: t.community,
      description: t.communityDesc,
      color: "text-teal-600",
    },
  ]

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
        <section className="text-center py-16">
          <Image
            src="/logo.png"
            alt="SilverCircle Logo"
            width={100}
            height={100}
            className="mx-auto mb-8 rounded-full shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Eye className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{t.vision}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{t.visionText}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{t.mission}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{t.missionText}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">{t.values}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0"
              >
                <CardContent className="p-8 text-center">
                  <value.icon className={`w-12 h-12 ${value.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-2xl rounded-3xl border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.story}</h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">{t.storyText}</p>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/profile">{t.joinUs}</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
