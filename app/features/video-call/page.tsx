"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  ArrowLeft,
  Plus,
  Coins,
  Lock,
} from "lucide-react"
import Link from "next/link"

interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "busy"
  lastSeen?: string
  relationship: "family" | "friend" | "companion"
}

interface CallHistory {
  id: string
  contact: Contact
  type: "incoming" | "outgoing" | "missed"
  duration: string
  timestamp: string
}

export default function VideoCallPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [userCoins, setUserCoins] = useState(150)
  const [activeCall, setActiveCall] = useState<Contact | null>(null)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Video Calling",
      subtitle: "Stay connected with family and friends through high-quality video calls",
      backToFeatures: "Back to Features",
      unlockFeature: "Unlock Video Calling",
      unlockDescription: "Unlock this premium feature to make video calls with your loved ones",
      unlockCost: "50 coins required",
      unlock: "Unlock Now",
      notEnoughCoins: "Not enough coins",
      earnMore: "Earn more coins by playing games",
      contacts: "Contacts",
      callHistory: "Call History",
      startCall: "Start Call",
      endCall: "End Call",
      videoOn: "Video On",
      videoOff: "Video Off",
      micOn: "Mic On",
      micOff: "Mic Off",
      speakerOn: "Speaker On",
      speakerOff: "Speaker Off",
      addContact: "Add Contact",
      online: "Online",
      offline: "Offline",
      busy: "Busy",
      lastSeen: "Last seen",
      incoming: "Incoming",
      outgoing: "Outgoing",
      missed: "Missed",
      duration: "Duration",
      family: "Family",
      friend: "Friend",
      companion: "Companion",
      callQuality: "HD Quality",
      secureCall: "End-to-End Encrypted",
      easyToUse: "Large Buttons & Simple Interface",
      features: "Premium Features",
    },
    hi: {
      title: "वीडियो कॉलिंग",
      subtitle: "उच्च गुणवत्ता वाली वीडियो कॉल के माध्यम से परिवार और दोस्तों के साथ जुड़े रहें",
      backToFeatures: "सुविधाओं पर वापस जाएं",
      unlockFeature: "वीडियो कॉलिंग अनलॉक करें",
      unlockDescription: "अपने प्रियजनों के साथ वीडियो कॉल करने के लिए इस प्रीमियम सुविधा को अनलॉक करें",
      unlockCost: "50 सिक्के आवश्यक",
      unlock: "अभी अनलॉक करें",
      notEnoughCoins: "पर्याप्त सिक्के नहीं",
      earnMore: "खेल खेलकर अधिक सिक्के कमाएं",
      contacts: "संपर्क",
      callHistory: "कॉल इतिहास",
      startCall: "कॉल शुरू करें",
      endCall: "कॉल समाप्त करें",
      videoOn: "वीडियो चालू",
      videoOff: "वीडियो बंद",
      micOn: "माइक चालू",
      micOff: "माइक बंद",
      speakerOn: "स्पीकर चालू",
      speakerOff: "स्पीकर बंद",
      addContact: "संपर्क जोड़ें",
      online: "ऑनलाइन",
      offline: "ऑफलाइन",
      busy: "व्यस्त",
      lastSeen: "अंतिम बार देखा गया",
      incoming: "आने वाली",
      outgoing: "जाने वाली",
      missed: "छूटी हुई",
      duration: "अवधि",
      family: "परिवार",
      friend: "मित्र",
      companion: "साथी",
      callQuality: "HD गुणवत्ता",
      secureCall: "एंड-टू-एंड एन्क्रिप्टेड",
      easyToUse: "बड़े बटन और सरल इंटरफेस",
      features: "प्रीमियम सुविधाएं",
    },
  }

  const t = translations[language as keyof typeof translations]

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
      relationship: "family",
    },
    {
      id: "2",
      name: "Michael Davis",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "offline",
      lastSeen: "2 hours ago",
      relationship: "friend",
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "busy",
      relationship: "family",
    },
    {
      id: "4",
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
      relationship: "companion",
    },
  ]

  const callHistory: CallHistory[] = [
    {
      id: "1",
      contact: contacts[0],
      type: "outgoing",
      duration: "15:32",
      timestamp: "Today, 2:30 PM",
    },
    {
      id: "2",
      contact: contacts[1],
      type: "incoming",
      duration: "8:45",
      timestamp: "Yesterday, 6:15 PM",
    },
    {
      id: "3",
      contact: contacts[2],
      type: "missed",
      duration: "0:00",
      timestamp: "Yesterday, 10:20 AM",
    },
  ]

  const handleUnlock = () => {
    if (userCoins >= 50) {
      setUserCoins(userCoins - 50)
      setIsUnlocked(true)
    }
  }

  const startCall = (contact: Contact) => {
    setActiveCall(contact)
  }

  const endCall = () => {
    setActiveCall(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <Phone className="w-4 h-4 text-green-600" />
      case "outgoing":
        return <Phone className="w-4 h-4 text-blue-600" />
      case "missed":
        return <PhoneOff className="w-4 h-4 text-red-600" />
      default:
        return <Phone className="w-4 h-4" />
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
        <div className="max-w-6xl mx-auto">
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
                      <Video className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t.callQuality}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Crystal clear video calls</p>
                    </div>
                    <div className="text-center">
                      <Monitor className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t.secureCall}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Your calls are private and secure</p>
                    </div>
                    <div className="text-center">
                      <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t.easyToUse}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Designed for seniors</p>
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
                      <span className="text-xl font-bold">50</span>
                      <span className="text-gray-600">required</span>
                    </div>
                  </div>

                  {userCoins >= 50 ? (
                    <Button
                      onClick={handleUnlock}
                      size="lg"
                      className="px-12 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg"
                    >
                      <Video className="w-6 h-6 mr-2" />
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
          ) : activeCall ? (
            /* Active Call Screen */
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
              {/* Video Area */}
              <div className="flex-1 relative">
                {/* Main Video */}
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={activeCall.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-4xl">{activeCall.name[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-3xl font-bold mb-2">{activeCall.name}</h2>
                    <p className="text-xl text-gray-300">Connected • 05:32</p>
                  </div>
                </div>

                {/* Self Video (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white text-xs">You</span>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="bg-black bg-opacity-80 p-8">
                <div className="flex justify-center space-x-6">
                  <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    size="lg"
                    className={`w-16 h-16 rounded-full ${
                      isVideoOn ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {isVideoOn ? <Video className="w-8 h-8" /> : <VideoOff className="w-8 h-8" />}
                  </Button>

                  <Button
                    onClick={() => setIsMicOn(!isMicOn)}
                    size="lg"
                    className={`w-16 h-16 rounded-full ${
                      isMicOn ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {isMicOn ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
                  </Button>

                  <Button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    size="lg"
                    className={`w-16 h-16 rounded-full ${
                      isSpeakerOn ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
                    } text-white`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-8 h-8" /> : <VolumeX className="w-8 h-8" />}
                  </Button>

                  <Button
                    onClick={endCall}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <PhoneOff className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Main Interface */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contacts */}
              <div className="lg:col-span-2">
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{t.contacts}</CardTitle>
                      <Button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.addContact}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}
                            ></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">{contact.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Badge className="text-xs">{t[contact.relationship as keyof typeof t]}</Badge>
                              <span>•</span>
                              <span>
                                {contact.status === "offline" && contact.lastSeen
                                  ? `${t.lastSeen} ${contact.lastSeen}`
                                  : t[contact.status as keyof typeof t]}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => startCall(contact)}
                          disabled={contact.status === "offline"}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl disabled:bg-gray-400"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          {t.startCall}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Call History */}
              <div>
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{t.callHistory}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {callHistory.map((call) => (
                      <div
                        key={call.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">{getCallTypeIcon(call.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 dark:text-white truncate">{call.contact.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{call.timestamp}</span>
                            {call.duration !== "0:00" && (
                              <>
                                <span>•</span>
                                <span>{call.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => startCall(call.contact)}
                          size="sm"
                          variant="ghost"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Features Card */}
                <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg rounded-2xl border-0 mt-6">
                  <CardContent className="p-6 text-center">
                    <Video className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">{t.features}</h3>
                    <ul className="text-sm space-y-1 opacity-90">
                      <li>• {t.callQuality}</li>
                      <li>• {t.secureCall}</li>
                      <li>• {t.easyToUse}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
