"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Users,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Send,
  ImageIcon,
  Smile,
  BookOpen,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    isVerified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
}

interface Member {
  id: string
  name: string
  avatar: string
  joinedDate: string
  isOnline: boolean
  role: "admin" | "moderator" | "member"
}

export default function CircleDetailPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [newPost, setNewPost] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const params = useParams()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      backToCircles: "Back to Circles",
      joinCircle: "Join Circle",
      leaveCircle: "Leave Circle",
      joined: "Joined",
      members: "members",
      posts: "Posts",
      members_tab: "Members",
      events: "Events",
      about: "About",
      shareThoughts: "Share your thoughts with the circle...",
      post: "Post",
      like: "Like",
      comment: "Comment",
      admin: "Admin",
      moderator: "Moderator",
      member: "Member",
      online: "Online",
      offline: "Offline",
      joinedOn: "Joined on",
      nextEvent: "Next Event",
      location: "Location",
      recentActivity: "Recent Activity",
      circleGuidelines: "Circle Guidelines",
    },
    hi: {
      backToCircles: "मंडलों पर वापस जाएं",
      joinCircle: "मंडल में शामिल हों",
      leaveCircle: "मंडल छोड़ें",
      joined: "शामिल हो गए",
      members: "सदस्य",
      posts: "पोस्ट",
      members_tab: "सदस्य",
      events: "कार्यक्रम",
      about: "के बारे में",
      shareThoughts: "मंडल के साथ अपने विचार साझा करें...",
      post: "पोस्ट करें",
      like: "पसंद",
      comment: "टिप्पणी",
      admin: "व्यवस्थापक",
      moderator: "संचालक",
      member: "सदस्य",
      online: "ऑनलाइन",
      offline: "ऑफलाइन",
      joinedOn: "शामिल हुए",
      nextEvent: "अगला कार्यक्रम",
      location: "स्थान",
      recentActivity: "हाल की गतिविधि",
      circleGuidelines: "मंडल दिशानिर्देश",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Mock data - in real app, this would come from API based on params.id
  const circleData = {
    id: params.id,
    name: language === "hi" ? "बुक क्लब - क्लासिक्स" : "Book Club - Classics",
    description:
      language === "hi"
        ? "क्लासिक साहित्य पर चर्चा करें और नई किताबें खोजें"
        : "Discuss classic literature and discover new reads together",
    memberCount: 234,
    location: "Online & Local Meetups",
    nextEvent: "Book Discussion - Tomorrow 3 PM",
    guidelines: "Be respectful, stay on topic, and share your love for books!",
    category: "reading",
  }

  const posts: Post[] = [
    {
      id: "1",
      author: {
        name: "Margaret Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content:
        "Just finished reading 'Pride and Prejudice' for the third time! Jane Austen's wit never gets old. What's everyone else reading this week?",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "Robert Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      content:
        "I'm currently diving into 'To Kill a Mockingbird'. The themes are so relevant even today. Would love to discuss this with the group!",
      image: "/placeholder.svg?height=200&width=300",
      timestamp: "4 hours ago",
      likes: 8,
      comments: 3,
      isLiked: true,
    },
    {
      id: "3",
      author: {
        name: "Eleanor Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      content:
        "Found this beautiful quote from 'The Great Gatsby': 'So we beat on, boats against the current, borne back ceaselessly into the past.' Fitzgerald's prose is simply magical.",
      timestamp: "1 day ago",
      likes: 15,
      comments: 7,
      isLiked: false,
    },
  ]

  const members: Member[] = [
    {
      id: "1",
      name: "Margaret Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "March 2024",
      isOnline: true,
      role: "admin",
    },
    {
      id: "2",
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "April 2024",
      isOnline: true,
      role: "moderator",
    },
    {
      id: "3",
      name: "Eleanor Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "February 2024",
      isOnline: false,
      role: "member",
    },
    {
      id: "4",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: "May 2024",
      isOnline: true,
      role: "member",
    },
  ]

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      // Handle post submission
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
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
              <Link href="/circles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToCircles}
              </Link>
            </Button>

            {/* Circle Info */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0 mb-6">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900">
                      <BookOpen className="w-12 h-12 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        {circleData.name}
                      </h1>
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {circleData.memberCount} {t.members}
                          </span>
                        </div>
                        {isJoined && <Badge className="bg-green-100 text-green-800">{t.joined}</Badge>}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsJoined(!isJoined)}
                    className={`px-8 py-3 rounded-xl text-lg font-medium ${
                      isJoined
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {isJoined ? t.leaveCircle : t.joinCircle}
                  </Button>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 mb-6">{circleData.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{circleData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{circleData.nextEvent}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg">
            {[
              { id: "posts", label: t.posts, icon: MessageCircle },
              { id: "members", label: t.members_tab, icon: Users },
              { id: "events", label: t.events, icon: Calendar },
              { id: "about", label: t.about, icon: Star },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-lg text-base ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Content based on active tab */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === "posts" && (
                <div className="space-y-6">
                  {/* New Post Form */}
                  {isJoined && (
                    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                      <CardContent className="p-6">
                        <form onSubmit={handlePostSubmit}>
                          <Textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder={t.shareThoughts}
                            className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px] mb-4"
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              <Button type="button" variant="outline" size="sm">
                                <ImageIcon className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="outline" size="sm">
                                <Smile className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button
                              type="submit"
                              disabled={!newPost.trim()}
                              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {t.post}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  {/* Posts */}
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-800 dark:text-white">{post.author.name}</h3>
                              {post.author.isVerified && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
                              )}
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.timestamp}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                            {post.image && (
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Post image"
                                className="rounded-xl mb-4 max-w-full h-auto"
                              />
                            )}
                            <div className="flex items-center space-x-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(post.id)}
                                className={`text-gray-500 hover:text-red-500 ${post.isLiked ? "text-red-500" : ""}`}
                              >
                                <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                                {post.likes} {t.like}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {post.comments} {t.comment}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "members" && (
                <div className="space-y-4">
                  {members.map((member) => (
                    <Card key={member.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              {member.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>
                                  {t.joinedOn} {member.joinedDate}
                                </span>
                                <span>•</span>
                                <Badge
                                  className={`text-xs ${
                                    member.role === "admin"
                                      ? "bg-purple-100 text-purple-800"
                                      : member.role === "moderator"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {t[member.role as keyof typeof t]}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm ${member.isOnline ? "text-green-600" : "text-gray-500"}`}>
                              {member.isOnline ? t.online : t.offline}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "events" && (
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No upcoming events</h3>
                    <p className="text-gray-500">Events will appear here when they are scheduled</p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "about" && (
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{t.about}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{circleData.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t.circleGuidelines}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{circleData.guidelines}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Circle Stats */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Circle Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Members</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{circleData.memberCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Posts Today</span>
                    <span className="font-semibold text-gray-800 dark:text-white">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Active Members</span>
                    <span className="font-semibold text-gray-800 dark:text-white">45</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Members */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Recent Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {members.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.joinedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
