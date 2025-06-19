"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Eye, Gamepad2, UserCheck, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { RatingModal } from "@/components/rating-modal"
import { VoiceNavigation } from "@/components/voice-navigation"
import React from "react"
import "@fontsource/dm-serif-display";
import "@fontsource/poppins/400.css";
import { Typewriter } from 'react-simple-typewriter';

interface Profile {
  id: string
  name: string
  age: number
  location: string
  bio: string
  interests: string[]
  avatar: string
  photos: string[]
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [activeTab, setActiveTab] = useState<"gentleman" | "lady">("gentleman")
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

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

  const playSwipeSound = (direction: "left" | "right") => {
    // Create audio context for swipe sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different frequencies for different swipe directions
    oscillator.frequency.setValueAtTime(direction === "right" ? 800 : 400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(
      direction === "right" ? 1200 : 200,
      audioContext.currentTime + 0.3,
    )

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const translations = {
    en: {
      headline: "Where silver meets soul, connection comes alive.",
      subtitle: "",
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
      brainGames: "Brain Games & Puzzles",
      brainGamesDesc: "Exercise your mind and earn coins for premium features",
      safeConnections: "Safe & Verified Connections",
      safeConnectionsDesc: "All members are verified for your peace of mind",
      meetPeople: "Meet Amazing People",
      gentleman: "Silvermen",
      lady: "Silverwomen",
      swipeToConnect: "Swipe to connect with wonderful people",
      interested: "Interested",
      pass: "Pass",
      sendMessage: "Send Message",
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
      brainGames: "दिमागी खेल और पहेलियां",
      brainGamesDesc: "अपने दिमाग का व्यायाम करें और प्रीमियम सुविधाओं के लिए सिक्के कमाएं",
      safeConnections: "सुरक्षित और सत्यापित कनेक्शन",
      safeConnectionsDesc: "आपकी मानसिक शांति के लिए सभी सदस्य सत्यापित हैं",
      meetPeople: "अद्भुत लोगों से मिलें",
      gentleman: "प्रतिष्ठित सज्जन",
      lady: "सुरुचिपूर्ण महिलाएं",
      swipeToConnect: "अद्भुत लोगों से जुड़ने के लिए स्वाइप करें",
      interested: "रुचि है",
      pass: "छोड़ें",
      sendMessage: "संदेश भेजें",
    },
  }

  const t = translations[language as keyof typeof translations]

  const gentlemenProfiles: Profile[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      age: 72,
      location: "Delhi, India",
      bio: "Retired government officer who loves classical music, chess, and morning walks. Looking for meaningful conversations and shared experiences.",
      interests: ["Classical Music", "Chess", "Reading", "Gardening", "History"],
      avatar: "/memories/men1.jpeg",
      photos: ["/memories/men1.jpeg"],
    },
    {
      id: "2",
      name: "Suresh Patel",
      age: 68,
      location: "Mumbai, India",
      bio: "Former engineer with a passion for photography and travel. Enjoys cooking traditional food and sharing stories from around India.",
      interests: ["Photography", "Travel", "Cooking", "Technology", "Art"],
      avatar: "/memories/men2.jpeg",
      photos: ["/memories/men2.jpeg"],
    },
    {
      id: "3",
      name: "Mohan Singh",
      age: 75,
      location: "Jaipur, India",
      bio: "Retired music teacher who still plays tabla. Love classical Indian music, good books, and meeting people who appreciate culture.",
      interests: ["Music", "Tabla", "Classical Arts", "Books", "Spirituality"],
      avatar: "/memories/men3.jpeg",
      photos: ["/memories/men3.jpeg"],
    },
  ]

  const ladiesProfiles: Profile[] = [
    {
      id: "4",
      name: "Sunita Sharma",
      age: 69,
      location: "Bangalore, India",
      bio: "Former teacher with a love for literature and classical dance. Enjoys painting, temple visits, and exploring cultural events.",
      interests: ["Literature", "Classical Dance", "Painting", "Spirituality", "Culture"],
      avatar: "/memories/lady1.jpeg",
      photos: ["/memories/lady1.jpeg"],
    },
    {
      id: "5",
      name: "Kamala Devi",
      age: 66,
      location: "Chennai, India",
      bio: "Retired nurse who loves cooking traditional South Indian food, yoga, and spending time in nature. Looking for someone to share life's beautiful moments.",
      interests: ["Cooking", "Yoga", "Nature", "Traditional Arts", "Volunteering"],
      avatar: "/memories/lady2.jpeg",
      photos: ["/memories/lady2.jpeg"],
    },
    {
      id: "6",
      name: "Meera Gupta",
      age: 71,
      location: "Kolkata, India",
      bio: "Former professor with a passion for gardening and handicrafts. Enjoys quiet evenings, good conversation, and creating beautiful rangoli.",
      interests: ["Gardening", "Handicrafts", "Reading", "Rangoli", "Classical Music"],
      avatar: "/memories/lady3.jpeg",
      photos: ["/memories/lady3.jpeg"],
    },
  ]

  const currentProfiles = activeTab === "gentleman" ? gentlemenProfiles : ladiesProfiles
  const currentProfile = currentProfiles[currentProfileIndex]

  const nextProfile = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % currentProfiles.length)
  }

  const previousProfile = () => {
    setCurrentProfileIndex((prev) => (prev - 1 + currentProfiles.length) % currentProfiles.length)
  }

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return

    setIsAnimating(true)
    setSwipeDirection(direction)
    playSwipeSound(direction)

    setTimeout(() => {
      nextProfile()
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
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
        {/* Hero Section with Background Logo and Glow */}
        <section className="relative text-center py-16 md:py-24 overflow-hidden">
          {/* Heart-shaped background images */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="relative w-[340px] h-[320px] md:w-[420px] md:h-[400px]">
              <Image
                src="/dadi.jpeg"
                alt="Dadi"
                width={200}
                height={200}
                className="absolute left-[10%] top-[20%] md:left-[5%] md:top-[15%] rounded-full shadow-xl opacity-70 rotate-[-25deg] border-4 border-white"
                style={{ zIndex: 1 }}
              />
              <Image
                src="/dadu.jpeg"
                alt="Dadu"
                width={200}
                height={200}
                className="absolute right-[10%] top-[20%] md:right-[5%] md:top-[15%] rounded-full shadow-xl opacity-70 rotate-[25deg] border-4 border-white"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
          {/* Animated Glowing Gradient Background */}
          <div className="glow-bg" />
          {/* Background SilverCircle Logo with Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <Image
              src="/logo.png"
              alt="SilverCircle Background"
              width={400}
              height={400}
              className="opacity-10 dark:opacity-5 glow-logo"
            />
          </div>
          {/* Main Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight italic"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              <span className="inline-block w-full min-h-[2.5em] text-purple-700 font-extrabold animate-pulse" style={{ textShadow: '0 2px 8px #a78bfa, 0 1px 2px #fbbf24' }}>
                <Typewriter
                  words={["Where silver meets soul,", "Where connection feels alive.", "Where every story shines."]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in tracking-wide"
              style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}
            >
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-full shadow-lg transform transition-all duration-200 glow-btn tracking-wide"
                asChild
                style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}
              >
                <Link href="/profile">{t.joinCommunity}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-full shadow-lg transform transition-all duration-200 glow-btn tracking-wide"
                asChild
                style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}
              >
                <Link href="/about">{t.learnMore}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Meet People Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            {t.meetPeople}
          </h2>

          {/* Profile Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
              <Button
                onClick={() => {
                  setActiveTab("gentleman")
                  setCurrentProfileIndex(0)
                }}
                className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                  activeTab === "gentleman"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                }`}
              >
                👨‍🦳 {t.gentleman}
              </Button>
              <Button
                onClick={() => {
                  setActiveTab("lady")
                  setCurrentProfileIndex(0)
                }}
                className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                  activeTab === "lady"
                    ? "bg-gradient-to-r from-pink-600 to-orange-600 text-white shadow-lg"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                }`}
              >
                👩‍🦳 {t.lady}
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="max-w-md mx-auto">
            <Card
              className={`bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 overflow-hidden transition-all duration-300 ${
                swipeDirection === "right"
                  ? "transform translate-x-full rotate-12 opacity-0"
                  : swipeDirection === "left"
                    ? "transform -translate-x-full -rotate-12 opacity-0"
                    : "transform translate-x-0 rotate-0 opacity-100"
              }`}
            >
              <div className="relative">
                <img
                  src={currentProfile.avatar || "/placeholder.svg"}
                  alt={currentProfile.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentProfileIndex + 1} / {currentProfiles.length}
                </div>

                {/* Navigation Arrows */}
                <Button
                  onClick={previousProfile}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  onClick={nextProfile}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{currentProfile.location}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{currentProfile.bio}</p>

                  {/* Interests */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {currentProfile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-orange-100 text-purple-800 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleSwipe("left")}
                    disabled={isAnimating}
                    className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl disabled:opacity-50"
                  >
                    <X className="w-5 h-5 mr-2" />
                    {t.pass}
                  </Button>
                  <Button
                    onClick={() => handleSwipe("right")}
                    disabled={isAnimating}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl disabled:opacity-50"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    {t.interested}
                  </Button>
                </div>

                <Button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-xl">
                  {t.sendMessage}
                </Button>
              </CardContent>
            </Card>

            <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-lg">{t.swipeToConnect}</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-orange-100 dark:from-purple-900/30 dark:to-orange-900/30 rounded-3xl shadow-xl mb-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <Heart className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              {t.mission}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{t.missionText}</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            {t.features}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/circles">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.nostalgiaRooms}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.nostalgiaDesc}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/circles">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.hobbyCircles}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.hobbyDesc}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/vr-memories">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.vrMemories}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.vrDesc}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/games">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <Gamepad2 className="w-12 h-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.brainGames}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.brainGamesDesc}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/about">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <UserCheck className="w-12 h-12 text-teal-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{t.safeConnections}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.safeConnectionsDesc}</p>
                </CardContent>
              </Card>
            </Link>
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

      {/* Add custom styles for animated glow */}
      <style jsx global>{`
        .glow-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          transform: translate(-50%, -50%);
          background: conic-gradient(from 180deg at 50% 50%, #a78bfa 0%, #fbbf24 25%, #f472b6 50%, #a78bfa 75%, #fbbf24 100%);
          filter: blur(80px) brightness(1.2);
          opacity: 0.7;
          z-index: 1;
          animation: spin 8s linear infinite;
          border-radius: 50%;
          pointer-events: none;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .glow-logo {
          box-shadow: 0 0 60px 10px #a78bfa, 0 0 120px 40px #fbbf24;
          transition: box-shadow 0.4s;
        }
        .glow-btn {
          box-shadow: 0 0 24px 4px #a78bfa88, 0 0 48px 8px #fbbf2488;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .glow-btn:hover {
          box-shadow: 0 0 48px 12px #a78bfa, 0 0 96px 24px #fbbf24;
          transform: scale(1.07);
        }
      `}</style>
    </div>
  )
}
