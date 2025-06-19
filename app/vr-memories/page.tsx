"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Camera,
  Eye,
  Heart,
  Share2,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Volume2,
  ArrowLeft,
  Plus,
  Calendar,
  MapPin,
  Users,
  Lock,
  Coins,
  Maximize,
  Minimize,
} from "lucide-react"
import Link from "next/link"

interface Memory {
  id: string
  title: string
  description: string
  location: string
  date: string
  imageUrl: string
  vrImageUrl?: string
  category: "childhood" | "family" | "travel" | "home" | "work" | "celebration"
  isPublic: boolean
  likes: number
  views: number
  isLiked: boolean
  uploadedBy: string
  uploadDate: string
  tags: string[]
}

interface VRSession {
  memoryId: string
  isActive: boolean
  duration: number
  startTime: Date
}

export default function VRMemoriesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(true) // Set to true for demo
  const [userCoins, setUserCoins] = useState(150)
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null)
  const [vrSession, setVrSession] = useState<VRSession | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isVRMode, setIsVRMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [vrControls, setVrControls] = useState({
    rotation: { x: 0, y: 0 },
    zoom: 1,
    isPlaying: false,
    volume: 0.5,
  })
  const vrViewerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "VR Memory Lane",
      subtitle: "Relive your precious memories in immersive 360-degree virtual reality",
      backToFeatures: "Back to Features",
      unlockFeature: "Unlock VR Memory Lane",
      unlockDescription: "Transform your cherished photos into immersive VR experiences",
      unlockCost: "75 coins required",
      unlock: "Unlock Now",
      notEnoughCoins: "Not enough coins",
      earnMore: "Earn more coins by playing games",
      myMemories: "My Memories",
      sharedMemories: "Community Memories",
      addMemory: "Add New Memory",
      uploadPhoto: "Upload Photo",
      memoryTitle: "Memory Title",
      memoryDescription: "Description",
      memoryLocation: "Location",
      memoryDate: "Date",
      category: "Category",
      makePublic: "Share with community",
      tags: "Tags (comma separated)",
      saveMemory: "Save Memory",
      cancel: "Cancel",
      enterVR: "Enter VR",
      exitVR: "Exit VR",
      viewMemory: "View Memory",
      likeMemory: "Like",
      shareMemory: "Share",
      views: "views",
      likes: "likes",
      uploadedBy: "Uploaded by",
      categories: {
        all: "All Categories",
        childhood: "Childhood",
        family: "Family",
        travel: "Travel",
        home: "Home",
        work: "Work Life",
        celebration: "Celebrations",
      },
      vrControls: {
        play: "Play Audio",
        pause: "Pause Audio",
        reset: "Reset View",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        volume: "Volume",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
      },
      instructions: "VR Instructions",
      instructionText: "Click and drag to look around, scroll to zoom, and use controls to navigate your memory.",
      processingImage: "Processing your image for VR...",
      vrReady: "VR Experience Ready!",
      noMemories: "No memories found",
      addFirstMemory: "Add your first memory to get started",
      searchPlaceholder: "Search memories...",
      dragToLook: "Click and drag to look around",
      scrollToZoom: "Scroll to zoom in/out",
    },
    hi: {
      title: "VR मेमोरी लेन",
      subtitle: "अपनी कीमती यादों को 360-डिग्री वर्चुअल रियलिटी में फिर से जिएं",
      backToFeatures: "सुविधाओं पर वापस जाएं",
      unlockFeature: "VR मेमोरी लेन अनलॉक करें",
      unlockDescription: "अपनी प्रिय तस्वीरों को इमर्सिव VR अनुभवों में बदलें",
      unlockCost: "75 सिक्के आवश्यक",
      unlock: "अभी अनलॉक करें",
      notEnoughCoins: "पर्याप्त सिक्के नहीं",
      earnMore: "खेल खेलकर अधिक सिक्के कमाएं",
      myMemories: "मेरी यादें",
      sharedMemories: "समुदायिक यादें",
      addMemory: "नई यादें जोड़ें",
      uploadPhoto: "फोटो अपलोड करें",
      memoryTitle: "यादों का शीर्षक",
      memoryDescription: "विवरण",
      memoryLocation: "स्थान",
      memoryDate: "तारीख",
      category: "श्रेणी",
      makePublic: "समुदाय के साथ साझा करें",
      tags: "टैग (कॉमा से अलग करें)",
      saveMemory: "यादें सहेजें",
      cancel: "रद्द करें",
      enterVR: "VR में प्रवेश करें",
      exitVR: "VR से बाहर निकलें",
      viewMemory: "यादें देखें",
      likeMemory: "पसंद",
      shareMemory: "साझा करें",
      views: "दृश्य",
      likes: "पसंद",
      uploadedBy: "द्वारा अपलोड किया गया",
      categories: {
        all: "सभी श्रेणियां",
        childhood: "बचपन",
        family: "परिवार",
        travel: "यात्रा",
        home: "घर",
        work: "कार्य जीवन",
        celebration: "उत्सव",
      },
      vrControls: {
        play: "ऑडियो चलाएं",
        pause: "ऑडियो रोकें",
        reset: "दृश्य रीसेट करें",
        zoomIn: "ज़ूम इन",
        zoomOut: "ज़ूम आउट",
        volume: "आवाज़",
        fullscreen: "पूर्ण स्क्रीन",
        exitFullscreen: "पूर्ण स्क्रीन से बाहर निकलें",
      },
      instructions: "VR निर्देश",
      instructionText: "चारों ओर देखने के लिए क्लिक करें और खींचें, ज़ूम करने के लिए स्क्रॉल करें।",
      processingImage: "VR के लिए आपकी छवि को प्रोसेस कर रहे हैं...",
      vrReady: "VR अनुभव तैयार!",
      noMemories: "कोई यादें नहीं मिलीं",
      addFirstMemory: "शुरू करने के लिए अपनी पहली यादें जोड़ें",
      searchPlaceholder: "यादें खोजें...",
      dragToLook: "चारों ओर देखने के लिए क्लिक करें और खींचें",
      scrollToZoom: "ज़ूम इन/आउट करने के लिए स्क्रॉल करें",
    },
  }

  const t = translations[language as keyof typeof translations]

  const sampleMemories: Memory[] = [
    {
      id: "1",
      title: "My Childhood Home",
      description: "The house where I grew up with my siblings. So many wonderful memories were made here.",
      location: "Springfield, Illinois",
      date: "1955",
      imageUrl: "/memories/childhood-home.jpg",
      vrImageUrl: "/memories/vr/childhood-home-360.jpg",
      category: "childhood",
      isPublic: true,
      likes: 23,
      views: 156,
      isLiked: false,
      uploadedBy: "Margaret Thompson",
      uploadDate: "2024-03-15",
      tags: ["childhood", "home", "family", "1950s"],
    },
    {
      id: "2",
      title: "Wedding Day at the Church",
      description: "The most beautiful day of my life, walking down the aisle at St. Mary's Church.",
      location: "St. Mary's Church, Boston",
      date: "1978",
      imageUrl: "/memories/wedding-church.jpg",
      vrImageUrl: "/memories/vr/wedding-church-360.jpg",
      category: "celebration",
      isPublic: true,
      likes: 45,
      views: 289,
      isLiked: true,
      uploadedBy: "Eleanor Davis",
      uploadDate: "2024-03-10",
      tags: ["wedding", "church", "celebration", "love"],
    },
    {
      id: "4",
      title: "Grandpa's Workshop",
      description: "Where I learned to work with my hands and create beautiful things from wood.",
      location: "Family Farm, Iowa",
      date: "1962",
      imageUrl: "/memories/workshop.jpg",
      vrImageUrl: "/memories/vr/workshop-360.jpg",
      category: "work",
      isPublic: true,
      likes: 18,
      views: 134,
      isLiked: false,
      uploadedBy: "James Wilson",
      uploadDate: "2024-03-05",
      tags: ["workshop", "grandfather", "woodworking", "learning"],
    },
    {
      id: "5",
      title: "Family Garden",
      description: "Sunday afternoons spent in our beautiful garden with the whole family gathered together.",
      location: "Family Home, California",
      date: "1985",
      imageUrl: "/memories/family-garden.jpg",
      vrImageUrl: "/memories/vr/family-garden-360.jpg",
      category: "family",
      isPublic: true,
      likes: 31,
      views: 198,
      isLiked: true,
      uploadedBy: "Dorothy Martinez",
      uploadDate: "2024-03-12",
      tags: ["family", "garden", "sunday", "togetherness"],
    },
    {
      id: "6",
      title: "Graduation Day",
      description: "The proudest moment of my life, graduating from college with my family cheering me on.",
      location: "State University",
      date: "1972",
      imageUrl: "/memories/graduation-day.jpg",
      vrImageUrl: "/memories/vr/graduation-day-360.jpg",
      category: "celebration",
      isPublic: true,
      likes: 27,
      views: 145,
      isLiked: false,
      uploadedBy: "Frank Johnson",
      uploadDate: "2024-03-07",
      tags: ["graduation", "education", "achievement", "family"],
    },
  ]

  const filteredMemories = sampleMemories.filter((memory) => {
    const matchesSearch =
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleUnlock = () => {
    if (userCoins >= 75) {
      setUserCoins(userCoins - 75)
      setIsUnlocked(true)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a server and process the image
      console.log("Uploading file:", file.name)
      // Simulate processing
      setTimeout(() => {
        setShowUploadForm(false)
      }, 2000)
    }
  }

  const enterVRMode = (memory: Memory) => {
    setActiveMemory(memory)
    setIsVRMode(true)
    setVrSession({
      memoryId: memory.id,
      isActive: true,
      duration: 0,
      startTime: new Date(),
    })
  }

  const exitVRMode = () => {
    setIsVRMode(false)
    setActiveMemory(null)
    setVrSession(null)
    setIsFullscreen(false)
    setVrControls({
      rotation: { x: 0, y: 0 },
      zoom: 1,
      isPlaying: false,
      volume: 0.5,
    })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleVRControl = (action: string, value?: number) => {
    setVrControls((prev) => {
      switch (action) {
        case "play":
          return { ...prev, isPlaying: !prev.isPlaying }
        case "reset":
          return { ...prev, rotation: { x: 0, y: 0 }, zoom: 1 }
        case "zoomIn":
          return { ...prev, zoom: Math.min(prev.zoom + 0.2, 3) }
        case "zoomOut":
          return { ...prev, zoom: Math.max(prev.zoom - 0.2, 0.5) }
        case "volume":
          return { ...prev, volume: value || 0.5 }
        default:
          return prev
      }
    })
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    setLastMousePos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !isVRMode) return

    const deltaX = event.clientX - lastMousePos.x
    const deltaY = event.clientY - lastMousePos.y

    setVrControls((prev) => ({
      ...prev,
      rotation: {
        x: Math.max(-90, Math.min(90, prev.rotation.x - deltaY * 0.5)),
        y: prev.rotation.y + deltaX * 0.5,
      },
    }))

    setLastMousePos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    const zoomDelta = event.deltaY > 0 ? -0.1 : 0.1
    setVrControls((prev) => ({
      ...prev,
      zoom: Math.max(0.5, Math.min(3, prev.zoom + zoomDelta)),
    }))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "childhood":
        return "🧸"
      case "family":
        return "👨‍👩‍👧‍👦"
      case "travel":
        return "✈️"
      case "home":
        return "🏠"
      case "work":
        return "💼"
      case "celebration":
        return "🎉"
      default:
        return "📸"
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" className="mb-4 text-purple-600 border-purple-600 hover:bg-purple-50" asChild>
              <Link href="/features">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToFeatures}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.subtitle}</p>
          </div>

          {!isUnlocked ? (
            /* Unlock Screen */
            <div className="text-center py-16">
              <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 max-w-2xl mx-auto">
                <CardContent className="p-12">
                  <Lock className="w-24 h-24 text-gray-400 mx-auto mb-8" />
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t.unlockFeature}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t.unlockDescription}</p>

                  {/* Features Preview */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">360° Immersion</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Look around your memories</p>
                    </div>
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Photo Enhancement</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered VR conversion</p>
                    </div>
                    <div className="text-center">
                      <Share2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Share Memories</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Connect through shared experiences</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <Coins className="w-6 h-6" />
                      <span className="text-xl font-bold">{userCoins}</span>
                      <span className="text-gray-600">your coins</span>
                    </div>
                    <div className="text-gray-400">•</div>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Coins className="w-6 h-6" />
                      <span className="text-xl font-bold">75</span>
                      <span className="text-gray-600">required</span>
                    </div>
                  </div>

                  {userCoins >= 75 ? (
                    <Button
                      onClick={handleUnlock}
                      size="lg"
                      className="px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg"
                    >
                      <Eye className="w-6 h-6 mr-2" />
                      {t.unlock}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        disabled
                        size="lg"
                        className="px-12 py-4 bg-gray-400 text-white rounded-xl text-lg cursor-not-allowed"
                      >
                        <Lock className="w-6 h-6 mr-2" />
                        {t.notEnoughCoins}
                      </Button>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t.earnMore}{" "}
                        <Link href="/games" className="text-purple-600 hover:underline">
                          Play Games
                        </Link>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : isVRMode && activeMemory ? (
            /* VR Viewer */
            <div
              className={`${isFullscreen ? "fixed inset-0" : "relative h-[80vh]"} bg-black z-50 flex flex-col rounded-2xl overflow-hidden`}
            >
              {/* VR Viewport */}
              <div
                ref={vrViewerRef}
                className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{
                  transform: `scale(${vrControls.zoom})`,
                  transformOrigin: "center",
                }}
              >
                {/* 360 Image Background */}
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-100"
                  style={{
                    backgroundImage: `url(${activeMemory.vrImageUrl || activeMemory.imageUrl})`,
                    transform: `rotateX(${vrControls.rotation.x}deg) rotateY(${vrControls.rotation.y}deg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Memory Information Overlay */}
                  <div className="absolute top-8 left-8 bg-black bg-opacity-80 text-white p-6 rounded-2xl max-w-md backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-2">{activeMemory.title}</h2>
                    <div className="flex items-center space-x-4 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{activeMemory.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{activeMemory.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{activeMemory.description}</p>
                  </div>

                  {/* VR Instructions */}
                  <div className="absolute top-8 right-8 bg-black bg-opacity-80 text-white p-4 rounded-2xl backdrop-blur-sm">
                    <h3 className="font-bold mb-2">{t.instructions}</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>🖱️ {t.dragToLook}</p>
                      <p>🔍 {t.scrollToZoom}</p>
                    </div>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute bottom-8 left-8 bg-black bg-opacity-80 text-white px-4 py-2 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <ZoomIn className="w-4 h-4" />
                      <span className="text-sm">{Math.round(vrControls.zoom * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VR Controls */}
              <div className="bg-black bg-opacity-90 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-6">
                  <Button
                    onClick={() => handleVRControl("play")}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                    title={vrControls.isPlaying ? t.vrControls.pause : t.vrControls.play}
                  >
                    {vrControls.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>

                  <Button
                    onClick={() => handleVRControl("reset")}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                    title={t.vrControls.reset}
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={() => handleVRControl("zoomOut")}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                    title={t.vrControls.zoomOut}
                  >
                    <ZoomOut className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={() => handleVRControl("zoomIn")}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                    title={t.vrControls.zoomIn}
                  >
                    <ZoomIn className="w-6 h-6" />
                  </Button>

                  <div className="flex items-center space-x-3 text-white">
                    <Volume2 className="w-6 h-6" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={vrControls.volume}
                      onChange={(e) => handleVRControl("volume", Number.parseFloat(e.target.value))}
                      className="w-24 accent-purple-600"
                    />
                  </div>

                  <Button
                    onClick={toggleFullscreen}
                    size="lg"
                    className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                    title={isFullscreen ? t.vrControls.exitFullscreen : t.vrControls.fullscreen}
                  >
                    {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </Button>

                  <Button
                    onClick={exitVRMode}
                    size="lg"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  >
                    {t.exitVR}
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 max-w-md mx-auto">
                  <div className="flex justify-between text-white text-sm mb-2">
                    <span>Viewing Progress</span>
                    <span>{Math.floor((vrSession?.duration || 0) / 60)}:00</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>
          ) : (
            /* Main Interface */
            <div>
              {/* Search and Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                  />
                  <Eye className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <div className="flex space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 text-lg bg-white dark:bg-gray-800"
                  >
                    {Object.entries(t.categories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>

                  <Button
                    onClick={() => setShowUploadForm(true)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {t.addMemory}
                  </Button>
                </div>
              </div>

              {/* Memories Grid */}
              {filteredMemories.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredMemories.map((memory) => (
                    <Card
                      key={memory.id}
                      className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={memory.imageUrl || "/placeholder.svg"}
                          alt={memory.title}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black bg-opacity-70 text-white">
                            {getCategoryIcon(memory.category)}{" "}
                            {t.categories[memory.category as keyof typeof t.categories]}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <Badge className="bg-black bg-opacity-70 text-white text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {memory.views}
                          </Badge>
                          <Badge className="bg-black bg-opacity-70 text-white text-xs">
                            <Heart className={`w-3 h-3 mr-1 ${memory.isLiked ? "fill-current text-red-500" : ""}`} />
                            {memory.likes}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {memory.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{memory.description}</p>

                        <div className="space-y-2 mb-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{memory.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{memory.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>
                              {t.uploadedBy} {memory.uploadedBy}
                            </span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {memory.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} className="bg-purple-100 text-purple-800 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => enterVRMode(memory)}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl"
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            {t.enterVR}
                          </Button>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-red-500 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              <Heart className={`w-4 h-4 mr-1 ${memory.isLiked ? "fill-current" : ""}`} />
                              {memory.likes}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-xl"
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              {t.shareMemory}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">{t.noMemories}</h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">{t.addFirstMemory}</p>
                  <Button
                    onClick={() => setShowUploadForm(true)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {t.addMemory}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Upload Form Modal */}
          {showUploadForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{t.addMemory}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.uploadPhoto}</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                    >
                      <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                      <p className="text-lg text-gray-600 dark:text-gray-300">Click to upload your memory photo</p>
                      <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.memoryTitle}</Label>
                      <Input className="mt-2 text-lg py-3 rounded-xl border-2 focus:border-purple-500" />
                    </div>
                    <div>
                      <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.category}</Label>
                      <select className="mt-2 w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 text-lg bg-white dark:bg-gray-700">
                        {Object.entries(t.categories)
                          .filter(([key]) => key !== "all")
                          .map(([key, value]) => (
                            <option key={key} value={key}>
                              {getCategoryIcon(key)} {value}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {t.memoryDescription}
                    </Label>
                    <Textarea className="mt-2 text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px]" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.memoryLocation}</Label>
                      <Input className="mt-2 text-lg py-3 rounded-xl border-2 focus:border-purple-500" />
                    </div>
                    <div>
                      <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.memoryDate}</Label>
                      <Input type="date" className="mt-2 text-lg py-3 rounded-xl border-2 focus:border-purple-500" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">{t.tags}</Label>
                    <Input
                      placeholder="family, vacation, 1980s, summer"
                      className="mt-2 text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="makePublic" className="w-5 h-5 text-purple-600" />
                    <Label htmlFor="makePublic" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {t.makePublic}
                    </Label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <Button className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg">
                      <Camera className="w-5 h-5 mr-2" />
                      {t.saveMemory}
                    </Button>
                    <Button
                      onClick={() => setShowUploadForm(false)}
                      variant="outline"
                      className="flex-1 py-3 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl text-lg"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
