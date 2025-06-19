"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  Heart,
  BookOpen,
  Camera,
  Utensils,
  Palette,
  Music,
  Flower,
  Gamepad2,
  Plane,
  Plus,
  MessageCircle,
  Calendar,
  MapPin,
} from "lucide-react"
import Link from "next/link"

interface Circle {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  icon: any
  color: string
  recentActivity: string
  isJoined: boolean
  featured: boolean
  location?: string
  nextEvent?: string
}

export default function CirclesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [joinedCircles, setJoinedCircles] = useState<string[]>([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Hobby Circles",
      subtitle: "Connect with others who share your passions and interests",
      searchPlaceholder: "Search circles...",
      allCategories: "All Categories",
      myCircles: "My Circles",
      featured: "Featured",
      joinCircle: "Join Circle",
      leaveCircle: "Leave Circle",
      joined: "Joined",
      members: "members",
      recentActivity: "Recent Activity",
      location: "Location",
      nextEvent: "Next Event",
      createCircle: "Create New Circle",
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
      title: "शौक मंडल",
      subtitle: "उन लोगों से जुड़ें जो आपके जुनून और रुचियों को साझा करते हैं",
      searchPlaceholder: "मंडल खोजें...",
      allCategories: "सभी श्रेणियां",
      myCircles: "मेरे मंडल",
      featured: "विशेष",
      joinCircle: "मंडल में शामिल हों",
      leaveCircle: "मंडल छोड़ें",
      joined: "शामिल हो गए",
      members: "सदस्य",
      recentActivity: "हाल की गतिविधि",
      location: "स्थान",
      nextEvent: "अगला कार्यक्रम",
      createCircle: "नया मंडल बनाएं",
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

  const circles: Circle[] = [
    {
      id: "1",
      name: language === "hi" ? "बुक क्लब - क्लासिक्स" : "Book Club - Classics",
      description:
        language === "hi"
          ? "क्लासिक साहित्य पर चर्चा करें और नई किताबें खोजें"
          : "Discuss classic literature and discover new reads together",
      category: "reading",
      memberCount: 234,
      icon: BookOpen,
      color: "text-blue-600",
      recentActivity: language === "hi" ? "2 घंटे पहले नई पोस्ट" : "New post 2 hours ago",
      isJoined: false,
      featured: true,
      location: "Online & Local Meetups",
      nextEvent: "Book Discussion - Tomorrow 3 PM",
    },
    {
      id: "2",
      name: language === "hi" ? "गार्डन गुरु" : "Garden Gurus",
      description:
        language === "hi"
          ? "बागवानी की तकनीकें, पौधों की देखभाल और मौसमी सुझाव साझा करें"
          : "Share gardening techniques, plant care tips, and seasonal advice",
      category: "gardening",
      memberCount: 189,
      icon: Flower,
      color: "text-green-600",
      recentActivity: language === "hi" ? "1 घंटे पहले फोटो साझा की गई" : "Photo shared 1 hour ago",
      isJoined: true,
      featured: true,
      location: "Community Gardens",
      nextEvent: "Spring Planting Workshop - Saturday",
    },
    {
      id: "3",
      name: language === "hi" ? "रसोई के राज" : "Kitchen Secrets",
      description:
        language === "hi"
          ? "पारंपरिक व्यंजन, खाना पकाने की तकनीकें और पारिवारिक नुस्खे"
          : "Traditional recipes, cooking techniques, and family secrets",
      category: "cooking",
      memberCount: 312,
      icon: Utensils,
      color: "text-orange-600",
      recentActivity: language === "hi" ? "30 मिनट पहले नया व्यंजन" : "New recipe 30 minutes ago",
      isJoined: false,
      featured: true,
      location: "Community Kitchen",
      nextEvent: "Cooking Class - Friday 2 PM",
    },
    {
      id: "4",
      name: language === "hi" ? "कलाकार मित्र" : "Artistic Friends",
      description:
        language === "hi"
          ? "पेंटिंग, शिल्प और रचनात्मक परियोजनाओं को साझा करें"
          : "Share paintings, crafts, and creative projects with fellow artists",
      category: "arts",
      memberCount: 156,
      icon: Palette,
      color: "text-purple-600",
      recentActivity: language === "hi" ? "4 घंटे पहले कलाकृति साझा की गई" : "Artwork shared 4 hours ago",
      isJoined: true,
      featured: false,
      location: "Art Studio",
      nextEvent: "Watercolor Workshop - Sunday",
    },
    {
      id: "5",
      name: language === "hi" ? "संगीत प्रेमी" : "Music Lovers",
      description:
        language === "hi"
          ? "क्लासिक संगीत, लोक गीत और संगीत की यादों को साझा करें"
          : "Share classic music, folk songs, and musical memories",
      category: "music",
      memberCount: 278,
      icon: Music,
      color: "text-red-600",
      recentActivity: language === "hi" ? "6 घंटे पहले गाना साझा किया गया" : "Song shared 6 hours ago",
      isJoined: false,
      featured: false,
      location: "Music Room",
      nextEvent: "Sing-along Session - Wednesday",
    },
    {
      id: "6",
      name: language === "hi" ? "फोटो कहानियां" : "Photo Stories",
      description:
        language === "hi"
          ? "तस्वीरों के माध्यम से यादें और कहानियां साझा करें"
          : "Share memories and stories through beautiful photographs",
      category: "photography",
      memberCount: 145,
      icon: Camera,
      color: "text-indigo-600",
      recentActivity: language === "hi" ? "1 दिन पहले फोटो अपलोड की गई" : "Photo uploaded 1 day ago",
      isJoined: false,
      featured: false,
      location: "Photo Walk Locations",
      nextEvent: "Nature Photography Walk - Monday",
    },
    {
      id: "7",
      name: language === "hi" ? "खेल और पहेली" : "Games & Puzzles",
      description:
        language === "hi"
          ? "शतरंज, ताश, पहेलियां और मजेदार खेल"
          : "Chess, cards, puzzles, and fun games for mental exercise",
      category: "games",
      memberCount: 203,
      icon: Gamepad2,
      color: "text-teal-600",
      recentActivity: language === "hi" ? "3 घंटे पहले चुनौती पोस्ट की गई" : "Challenge posted 3 hours ago",
      isJoined: true,
      featured: false,
      location: "Game Room",
      nextEvent: "Chess Tournament - Thursday",
    },
    {
      id: "8",
      name: language === "hi" ? "यात्रा साथी" : "Travel Companions",
      description:
        language === "hi"
          ? "यात्रा की यादें, सुझाव और भविष्य की यात्रा योजनाएं"
          : "Share travel memories, tips, and plan future adventures",
      category: "travel",
      memberCount: 167,
      icon: Plane,
      color: "text-sky-600",
      recentActivity: language === "hi" ? "5 घंटे पहले यात्रा फोटो" : "Travel photo 5 hours ago",
      isJoined: false,
      featured: false,
      location: "Various Destinations",
      nextEvent: "Local Heritage Tour - Next Week",
    },
  ]

  const categories = [
    { id: "all", name: t.allCategories, icon: Users },
    { id: "reading", name: t.categories.reading, icon: BookOpen },
    { id: "cooking", name: t.categories.cooking, icon: Utensils },
    { id: "gardening", name: t.categories.gardening, icon: Flower },
    { id: "arts", name: t.categories.arts, icon: Palette },
    { id: "music", name: t.categories.music, icon: Music },
    { id: "photography", name: t.categories.photography, icon: Camera },
    { id: "games", name: t.categories.games, icon: Gamepad2 },
    { id: "travel", name: t.categories.travel, icon: Plane },
  ]

  const filteredCircles = circles.filter((circle) => {
    const matchesSearch =
      circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || circle.category === selectedCategory
    const matchesJoined = selectedCategory === "joined" ? circle.isJoined : true
    const matchesFeatured = selectedCategory === "featured" ? circle.featured : true

    return matchesSearch && matchesCategory && matchesJoined && matchesFeatured
  })

  const handleJoinCircle = (circleId: string) => {
    if (joinedCircles.includes(circleId)) {
      setJoinedCircles(joinedCircles.filter((id) => id !== circleId))
    } else {
      setJoinedCircles([...joinedCircles, circleId])
    }
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
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">{t.subtitle}</p>

          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
              />
            </div>
            <Button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg" asChild>
              <Link href="/circles/create">
                <Plus className="w-5 h-5 mr-2" />
                {t.createCircle}
              </Link>
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-base ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
            <Button
              variant={selectedCategory === "joined" ? "default" : "outline"}
              onClick={() => setSelectedCategory("joined")}
              className={`px-4 py-2 rounded-full text-base ${
                selectedCategory === "joined"
                  ? "bg-purple-600 text-white"
                  : "border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.myCircles}
            </Button>
            <Button
              variant={selectedCategory === "featured" ? "default" : "outline"}
              onClick={() => setSelectedCategory("featured")}
              className={`px-4 py-2 rounded-full text-base ${
                selectedCategory === "featured"
                  ? "bg-purple-600 text-white"
                  : "border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.featured}
            </Button>
          </div>
        </section>

        {/* Circles Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCircles.map((circle) => (
            <Card
              key={circle.id}
              className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                      <circle.icon className={`w-8 h-8 ${circle.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{circle.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {circle.memberCount} {t.members}
                        </span>
                        {circle.featured && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">{t.featured}</Badge>
                        )}
                        {(circle.isJoined || joinedCircles.includes(circle.id)) && (
                          <Badge className="bg-green-100 text-green-800 text-xs">{t.joined}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{circle.description}</p>

                {/* Location */}
                {circle.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{circle.location}</span>
                  </div>
                )}

                {/* Next Event */}
                {circle.nextEvent && (
                  <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                    <Calendar className="w-4 h-4" />
                    <span>{circle.nextEvent}</span>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {t.recentActivity}: {circle.recentActivity}
                  </span>
                </div>

                {/* Sample Members */}
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Avatar key={i} className="w-8 h-8 border-2 border-white">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback className="text-xs">M{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">+{circle.memberCount - 3} more</span>
                </div>

                {/* Join Button */}
                <Button
                  onClick={() => handleJoinCircle(circle.id)}
                  className={`w-full py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    circle.isJoined || joinedCircles.includes(circle.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {circle.isJoined || joinedCircles.includes(circle.id) ? t.leaveCircle : t.joinCircle}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Empty State */}
        {filteredCircles.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No circles found</h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Try adjusting your search or browse different categories
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            >
              Show All Circles
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
