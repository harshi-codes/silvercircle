"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Users,
  Coffee,
  Camera,
  Book,
  Music,
  Flower,
  Plane,
  Shield,
  Check,
} from "lucide-react"

interface Companion {
  id: string
  name: string
  age: number
  location: string
  distance: number
  avatar: string
  bio: string
  interests: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isOnline: boolean
  activities: string[]
  languages: string[]
  joinedDate: string
  responseTime: string
}

export default function CompanionsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedActivity, setSelectedActivity] = useState("all")
  const [maxDistance, setMaxDistance] = useState("25")
  const [sortBy, setSortBy] = useState("distance")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Find Companions",
      subtitle: "Connect with trusted companions for activities, outings, and adventures",
      searchPlaceholder: "Search companions...",
      filterByActivity: "Filter by Activity",
      allActivities: "All Activities",
      maxDistance: "Max Distance",
      sortBy: "Sort By",
      distance: "Distance",
      rating: "Rating",
      newest: "Newest",
      milesAway: "miles away",
      yearsOld: "years old",
      reviews: "reviews",
      verified: "Verified",
      online: "Online",
      offline: "Offline",
      sendMessage: "Send Message",
      callNow: "Call Now",
      viewProfile: "View Profile",
      activities: "Activities",
      languages: "Languages",
      memberSince: "Member since",
      responseTime: "Response time",
      noCompanions: "No companions found",
      adjustFilters: "Try adjusting your search filters",
      showAll: "Show All",
      activitiesList: {
        coffee: "Coffee & Chat",
        shopping: "Shopping",
        walking: "Walking",
        movies: "Movies",
        dining: "Dining Out",
        gardening: "Gardening",
        reading: "Reading",
        music: "Music",
        photography: "Photography",
        travel: "Travel",
        crafts: "Arts & Crafts",
        games: "Games",
      },
    },
    hi: {
      title: "साथी खोजें",
      subtitle: "गतिविधियों, सैर और रोमांच के लिए विश्वसनीय साथियों से जुड़ें",
      searchPlaceholder: "साथी खोजें...",
      filterByActivity: "गतिविधि के अनुसार फ़िल्टर करें",
      allActivities: "सभी गतिविधियां",
      maxDistance: "अधिकतम दूरी",
      sortBy: "इसके अनुसार क्रमबद्ध करें",
      distance: "दूरी",
      rating: "रेटिंग",
      newest: "नवीनतम",
      milesAway: "मील दूर",
      yearsOld: "साल के",
      reviews: "समीक्षाएं",
      verified: "सत्यापित",
      online: "ऑनलाइन",
      offline: "ऑफलाइन",
      sendMessage: "संदेश भेजें",
      callNow: "अभी कॉल करें",
      viewProfile: "प्रोफाइल देखें",
      activities: "गतिविधियां",
      languages: "भाषाएं",
      memberSince: "सदस्य बने",
      responseTime: "प्रतिक्रिया समय",
      noCompanions: "कोई साथी नहीं मिला",
      adjustFilters: "अपने खोज फ़िल्टर को समायोजित करने का प्रयास करें",
      showAll: "सभी दिखाएं",
      activitiesList: {
        coffee: "कॉफी और बातचीत",
        shopping: "खरीदारी",
        walking: "टहलना",
        movies: "फिल्में",
        dining: "बाहर खाना",
        gardening: "बागवानी",
        reading: "पढ़ना",
        music: "संगीत",
        photography: "फोटोग्राफी",
        travel: "यात्रा",
        crafts: "कला और शिल्प",
        games: "खेल",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  const companions: Companion[] = [
    {
      id: "1",
      name: "Margaret Thompson",
      age: 68,
      location: "Downtown, Springfield",
      distance: 2.3,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Retired teacher who loves books, gardening, and good conversation. Looking for companions to explore local museums and cafes.",
      interests: ["Reading", "Gardening", "Museums", "Coffee"],
      rating: 4.9,
      reviewCount: 23,
      isVerified: true,
      isOnline: true,
      activities: ["coffee", "reading", "gardening", "walking"],
      languages: ["English"],
      joinedDate: "March 2024",
      responseTime: "Usually responds within 2 hours",
    },
    {
      id: "2",
      name: "Robert Chen",
      age: 72,
      location: "Riverside District",
      distance: 4.1,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Former engineer with a passion for photography and travel. Happy to share stories and explore new places together.",
      interests: ["Photography", "Travel", "Technology", "History"],
      rating: 4.8,
      reviewCount: 31,
      isVerified: true,
      isOnline: false,
      activities: ["photography", "travel", "coffee", "movies"],
      languages: ["English", "Mandarin"],
      joinedDate: "February 2024",
      responseTime: "Usually responds within 4 hours",
    },
    {
      id: "3",
      name: "Eleanor Davis",
      age: 65,
      location: "Oak Hill Neighborhood",
      distance: 6.7,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Artist and craft enthusiast. Love creating beautiful things and would enjoy sharing creative projects with others.",
      interests: ["Arts & Crafts", "Painting", "Music", "Dancing"],
      rating: 4.7,
      reviewCount: 18,
      isVerified: false,
      isOnline: true,
      activities: ["crafts", "music", "coffee", "shopping"],
      languages: ["English", "Spanish"],
      joinedDate: "April 2024",
      responseTime: "Usually responds within 1 hour",
    },
    {
      id: "4",
      name: "James Wilson",
      age: 70,
      location: "Maple Street Area",
      distance: 8.2,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Retired chef who enjoys cooking, dining out, and discovering new restaurants. Great companion for food adventures!",
      interests: ["Cooking", "Dining", "Wine", "Travel"],
      rating: 4.9,
      reviewCount: 27,
      isVerified: true,
      isOnline: true,
      activities: ["dining", "cooking", "travel", "coffee"],
      languages: ["English", "French"],
      joinedDate: "January 2024",
      responseTime: "Usually responds within 30 minutes",
    },
    {
      id: "5",
      name: "Dorothy Martinez",
      age: 69,
      location: "Sunset Gardens",
      distance: 12.5,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Nature lover and avid walker. Enjoy exploring parks, botanical gardens, and scenic trails with good company.",
      interests: ["Walking", "Nature", "Gardening", "Birds"],
      rating: 4.6,
      reviewCount: 15,
      isVerified: true,
      isOnline: false,
      activities: ["walking", "gardening", "photography", "coffee"],
      languages: ["English", "Spanish"],
      joinedDate: "May 2024",
      responseTime: "Usually responds within 6 hours",
    },
    {
      id: "6",
      name: "Frank Johnson",
      age: 74,
      location: "Heritage Village",
      distance: 15.3,
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Music enthusiast and former band member. Love attending concerts, playing games, and sharing musical memories.",
      interests: ["Music", "Games", "History", "Stories"],
      rating: 4.8,
      reviewCount: 22,
      isVerified: true,
      isOnline: true,
      activities: ["music", "games", "coffee", "movies"],
      languages: ["English"],
      joinedDate: "December 2023",
      responseTime: "Usually responds within 3 hours",
    },
  ]

  const activityIcons = {
    coffee: Coffee,
    shopping: Users,
    walking: Users,
    movies: Camera,
    dining: Coffee,
    gardening: Flower,
    reading: Book,
    music: Music,
    photography: Camera,
    travel: Plane,
    crafts: Star,
    games: Users,
  }

  const filteredCompanions = companions.filter((companion) => {
    const matchesSearch =
      companion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companion.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companion.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesActivity = selectedActivity === "all" || companion.activities.includes(selectedActivity)
    const matchesDistance = companion.distance <= Number.parseInt(maxDistance)

    return matchesSearch && matchesActivity && matchesDistance
  })

  const sortedCompanions = [...filteredCompanions].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
      default:
        return 0
    }
  })

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

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                />
              </div>

              <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                  <SelectValue placeholder={t.filterByActivity} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allActivities}</SelectItem>
                  {Object.entries(t.activitiesList).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={maxDistance} onValueChange={setMaxDistance}>
                <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                  <SelectValue placeholder={t.maxDistance} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50 miles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">{t.distance}</SelectItem>
                  <SelectItem value="rating">{t.rating}</SelectItem>
                  <SelectItem value="newest">{t.newest}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Companions Grid */}
        <section>
          {sortedCompanions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCompanions.map((companion) => (
                <Card
                  key={companion.id}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={companion.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">{companion.name[0]}</AvatarFallback>
                        </Avatar>
                        {companion.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                            {companion.name}
                          </CardTitle>
                          {companion.isVerified && <Check className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>
                            {companion.age} {t.yearsOld}
                          </span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {companion.distance} {t.milesAway}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{companion.rating}</span>
                            <span className="text-gray-500">
                              ({companion.reviewCount} {t.reviews})
                            </span>
                          </div>
                          <Badge
                            className={companion.isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {companion.isOnline ? t.online : t.offline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{companion.bio}</p>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{companion.location}</span>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.activities}</h4>
                      <div className="flex flex-wrap gap-2">
                        {companion.activities.slice(0, 3).map((activity) => {
                          const IconComponent = activityIcons[activity as keyof typeof activityIcons]
                          return (
                            <Badge key={activity} className="bg-purple-100 text-purple-800 text-xs">
                              <IconComponent className="w-3 h-3 mr-1" />
                              {t.activitiesList[activity as keyof typeof t.activitiesList]}
                            </Badge>
                          )
                        })}
                        {companion.activities.length > 3 && (
                          <Badge className="bg-gray-100 text-gray-600 text-xs">
                            +{companion.activities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.languages}</h4>
                      <div className="flex flex-wrap gap-2">
                        {companion.languages.map((lang) => (
                          <Badge key={lang} className="bg-blue-100 text-blue-800 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>
                        {t.memberSince} {companion.joinedDate}
                      </div>
                      <div>{companion.responseTime}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {t.sendMessage}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-500 text-green-500 hover:bg-green-50 rounded-xl"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {t.callNow}
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="w-full text-gray-600 hover:text-purple-600 rounded-xl">
                      {t.viewProfile}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">{t.noCompanions}</h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">{t.adjustFilters}</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedActivity("all")
                  setMaxDistance("25")
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                {t.showAll}
              </Button>
            </div>
          )}
        </section>

        {/* Safety Notice */}
        <section className="mt-16">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Safety First</h3>
              <p className="text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
                All companions are verified members of our community. Always meet in public places for your first
                meeting, and trust your instincts. Report any concerns to our support team immediately.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
