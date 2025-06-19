"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Globe, Camera, MessageCircle, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
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
      title: "Features That Connect Hearts",
      subtitle: "Discover all the ways SilverCircle brings seniors together",
      nostalgiaRooms: "Decade-based Nostalgia Rooms",
      nostalgiaDesc:
        "Step into themed rooms based on your favorite decades. Share memories, photos, and stories with peers who lived through the same era.",
      hobbyCircles: "Interest-based Hobby Circles",
      hobbyDesc:
        "Join circles for gardening, cooking, reading, crafts, and more. Find your tribe and share your passions.",
      vrMemories: "Immersive VR Memory Lane",
      vrDesc:
        "Experience virtual tours of historical places, revisit old neighborhoods, and explore memories in stunning detail.",
      videoChat: "Simple Video Calling",
      videoChatDesc:
        "Easy-to-use video calls with large buttons and clear audio. Stay connected with family and friends.",
      safeSpace: "Safe & Secure Environment",
      safeSpaceDesc: "Verified profiles, moderated content, and 24/7 support ensure a safe space for all members.",
      memories: "Memory Sharing",
      memoriesDesc:
        "Share photos, stories, and life experiences in a beautiful, organized way that celebrates your journey.",
      support: "24/7 Support",
      supportDesc: "Our dedicated support team is always available to help with any questions or technical issues.",
      getStarted: "Get Started Today",
    },
    hi: {
      title: "दिलों को जोड़ने वाली विशेषताएं",
      subtitle: "जानें कि सिल्वरसर्कल कैसे वरिष्ठ नागरिकों को एक साथ लाता है",
      nostalgiaRooms: "दशक-आधारित नॉस्टेल्जिया रूम",
      nostalgiaDesc: "अपने पसंदीदा दशकों पर आधारित कमरों में कदम रखें। यादें, तस्वीरें और कहानियां साझा करें।",
      hobbyCircles: "रुचि-आधारित शौक मंडल",
      hobbyDesc: "बागवानी, खाना पकाने, पढ़ने, शिल्प और अन्य के लिए मंडलों में शामिल हों।",
      vrMemories: "वर्चुअल रियलिटी मेमोरी लेन",
      vrDesc: "ऐतिहासिक स्थानों के वर्चुअल टूर का अनुभव करें, पुराने पड़ोस को फिर से देखें।",
      videoChat: "सरल वीडियो कॉलिंग",
      videoChatDesc: "बड़े बटन और स्पष्ट ऑडियो के साथ उपयोग में आसान वीडियो कॉल।",
      safeSpace: "सुरक्षित वातावरण",
      safeSpaceDesc: "सत्यापित प्रोफाइल, नियंत्रित सामग्री और 24/7 सहायता।",
      memories: "यादों का साझाकरण",
      memoriesDesc: "तस्वीरें, कहानियां और जीवन के अनुभव साझा करें।",
      support: "24/7 सहायता",
      supportDesc: "हमारी समर्पित सहायता टीम हमेशा उपलब्ध है।",
      getStarted: "आज ही शुरू करें",
    },
  }

  const t = translations[language as keyof typeof translations]

  const features = [
    {
      icon: Users,
      title: t.nostalgiaRooms,
      description: t.nostalgiaDesc,
      color: "text-purple-600",
      href: "/circles",
    },
    {
      icon: Heart,
      title: t.hobbyCircles,
      description: t.hobbyDesc,
      color: "text-orange-500",
      href: "/circles",
    },
    {
      icon: Globe,
      title: t.vrMemories,
      description: t.vrDesc,
      color: "text-blue-600",
      href: "/vr-memories",
    },
    {
      icon: Camera,
      title: t.videoChat,
      description: t.videoChatDesc,
      color: "text-red-500",
      href: "/features/video-call",
    },
    {
      icon: Shield,
      title: t.safeSpace,
      description: t.safeSpaceDesc,
      color: "text-indigo-600",
      href: "/about",
    },
    {
      icon: MessageCircle,
      title: t.memories,
      description: t.memoriesDesc,
      color: "text-pink-600",
      href: "/vr-memories",
    },
    {
      icon: Headphones,
      title: t.support,
      description: t.supportDesc,
      color: "text-teal-600",
      href: "/about",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t.subtitle}</p>
        </section>

        {/* Features Grid */}
        <section className="py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <feature.icon className={`w-16 h-16 ${feature.color} mx-auto mb-6`} />
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              asChild
            >
              <Link href="/profile">{t.getStarted}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
