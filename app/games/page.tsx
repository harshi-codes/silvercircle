"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Trophy, Star, Clock, Gamepad2, Puzzle, Brain, Target, Gift, Lock, Unlock } from "lucide-react"
import Link from "next/link"

interface Game {
  id: string
  name: string
  description: string
  icon: any
  difficulty: "easy" | "medium" | "hard"
  coinsReward: number
  timeLimit?: number
  isUnlocked: boolean
  requiredCoins?: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  coinsReward: number
  isUnlocked: boolean
  progress: number
  maxProgress: number
}

export default function GamesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [userCoins, setUserCoins] = useState(150)
  const [userLevel, setUserLevel] = useState(3)
  const [dailyStreak, setDailyStreak] = useState(5)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Brain Games & Puzzles",
      subtitle: "Exercise your mind and earn coins to unlock premium features",
      yourCoins: "Your Coins",
      level: "Level",
      dailyStreak: "Daily Streak",
      days: "days",
      playNow: "Play Now",
      unlock: "Unlock",
      locked: "Locked",
      coinsReward: "coins reward",
      timeLimit: "Time Limit",
      minutes: "min",
      difficulty: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      },
      achievements: "Achievements",
      dailyChallenge: "Daily Challenge",
      completeDailyChallenge: "Complete today's challenge for bonus coins!",
      featuresUnlock: "Features You Can Unlock",
      premiumFeatures: "Premium Features",
      games: {
        wordPuzzle: "Word Puzzle",
        wordPuzzleDesc: "Find hidden words in the letter grid",
        memoryMatch: "Memory Match",
        memoryMatchDesc: "Match pairs of cards to test your memory",
        sudoku: "Number Sudoku",
        sudokuDesc: "Fill the grid with numbers 1-9",
        crossword: "Daily Crossword",
        crosswordDesc: "Solve clues to complete the crossword",
        trivia: "Senior Trivia",
        triviaDesc: "Test your knowledge of history and culture",
      },
      unlockableFeatures: {
        videoCall: "Video Calling",
        videoCallDesc: "Make video calls with friends and family",
        videoCallCost: "50 coins to unlock",
        premiumCircles: "Premium Circles",
        premiumCirclesDesc: "Access exclusive hobby circles",
        premiumCirclesCost: "100 coins to unlock",
        personalAssistant: "AI Assistant",
        personalAssistantDesc: "Get help with daily tasks and reminders",
        personalAssistantCost: "200 coins to unlock",
        prioritySupport: "Priority Support",
        prioritySupportDesc: "Get faster help when you need it",
        prioritySupportCost: "75 coins to unlock",
      },
    },
    hi: {
      title: "दिमागी खेल और पहेलियां",
      subtitle: "अपने दिमाग का व्यायाम करें और प्रीमियम सुविधाओं को अनलॉक करने के लिए सिक्के कमाएं",
      yourCoins: "आपके सिक्के",
      level: "स्तर",
      dailyStreak: "दैनिक श्रृंखला",
      days: "दिन",
      playNow: "अभी खेलें",
      unlock: "अनलॉक करें",
      locked: "बंद",
      coinsReward: "सिक्के इनाम",
      timeLimit: "समय सीमा",
      minutes: "मिनट",
      difficulty: {
        easy: "आसान",
        medium: "मध्यम",
        hard: "कठिन",
      },
      achievements: "उपलब्धियां",
      dailyChallenge: "दैनिक चुनौती",
      completeDailyChallenge: "बोनस सिक्कों के लिए आज की चुनौती पूरी करें!",
      featuresUnlock: "आप जो सुविधाएं अनलॉक कर सकते हैं",
      premiumFeatures: "प्रीमियम सुविधाएं",
      games: {
        wordPuzzle: "शब्द पहेली",
        wordPuzzleDesc: "अक्षर ग्रिड में छुपे शब्द खोजें",
        memoryMatch: "मेमोरी मैच",
        memoryMatchDesc: "अपनी याददाश्त का परीक्षण करने के लिए कार्ड के जोड़े मिलाएं",
        sudoku: "संख्या सुडोकू",
        sudokuDesc: "ग्रिड को 1-9 संख्याओं से भरें",
        crossword: "दैनिक क्रॉसवर्ड",
        crosswordDesc: "क्रॉसवर्ड पूरा करने के लिए सुराग हल करें",
        trivia: "वरिष्ठ ट्रिविया",
        triviaDesc: "इतिहास और संस्कृति के अपने ज्ञान का परीक्षण करें",
      },
      unlockableFeatures: {
        videoCall: "वीडियो कॉलिंग",
        videoCallDesc: "दोस्तों और परिवार के साथ वीडियो कॉल करें",
        videoCallCost: "अनलॉक करने के लिए 50 सिक्के",
        premiumCircles: "प्रीमियम मंडल",
        premiumCirclesDesc: "विशेष शौक मंडलों तक पहुंच",
        premiumCirclesCost: "अनलॉक करने के लिए 100 सिक्के",
        personalAssistant: "AI सहायक",
        personalAssistantDesc: "दैनिक कार्यों और अनुस्मारकों में सहायता प्राप्त करें",
        personalAssistantCost: "अनलॉक करने के लिए 200 सिक्के",
        prioritySupport: "प्राथमिकता सहायता",
        prioritySupportDesc: "जब आपको जरूरत हो तो तेज़ सहायता पाएं",
        prioritySupportCost: "अनलॉक करने के लिए 75 सिक्के",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  const games: Game[] = [
    {
      id: "word-puzzle",
      name: t.games.wordPuzzle,
      description: t.games.wordPuzzleDesc,
      icon: Puzzle,
      difficulty: "easy",
      coinsReward: 10,
      timeLimit: 15,
      isUnlocked: true,
    },
    {
      id: "memory-match",
      name: t.games.memoryMatch,
      description: t.games.memoryMatchDesc,
      icon: Brain,
      difficulty: "medium",
      coinsReward: 15,
      timeLimit: 10,
      isUnlocked: true,
    },
    {
      id: "sudoku",
      name: t.games.sudoku,
      description: t.games.sudokuDesc,
      icon: Target,
      difficulty: "hard",
      coinsReward: 25,
      isUnlocked: userCoins >= 20,
      requiredCoins: 20,
    },
    {
      id: "crossword",
      name: t.games.crossword,
      description: t.games.crosswordDesc,
      icon: Puzzle,
      difficulty: "medium",
      coinsReward: 20,
      isUnlocked: userCoins >= 30,
      requiredCoins: 30,
    },
    {
      id: "trivia",
      name: t.games.trivia,
      description: t.games.triviaDesc,
      icon: Trophy,
      difficulty: "medium",
      coinsReward: 18,
      timeLimit: 5,
      isUnlocked: userCoins >= 15,
      requiredCoins: 15,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "first-win",
      name: "First Victory",
      description: "Win your first game",
      icon: Trophy,
      coinsReward: 25,
      isUnlocked: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Play for 7 consecutive days",
      icon: Star,
      coinsReward: 50,
      isUnlocked: false,
      progress: 5,
      maxProgress: 7,
    },
    {
      id: "coin-collector",
      name: "Coin Collector",
      description: "Earn 500 coins total",
      icon: Coins,
      coinsReward: 100,
      isUnlocked: false,
      progress: 150,
      maxProgress: 500,
    },
  ]

  const unlockableFeatures = [
    {
      id: "video-call",
      name: t.unlockableFeatures.videoCall,
      description: t.unlockableFeatures.videoCallDesc,
      cost: 50,
      isUnlocked: userCoins >= 50,
      href: "/features/video-call",
    },
    {
      id: "premium-circles",
      name: t.unlockableFeatures.premiumCircles,
      description: t.unlockableFeatures.premiumCirclesDesc,
      cost: 100,
      isUnlocked: userCoins >= 100,
      href: "/circles/premium",
    },
    {
      id: "ai-assistant",
      name: t.unlockableFeatures.personalAssistant,
      description: t.unlockableFeatures.personalAssistantDesc,
      cost: 200,
      isUnlocked: userCoins >= 200,
      href: "/features/ai-assistant",
    },
    {
      id: "priority-support",
      name: t.unlockableFeatures.prioritySupport,
      description: t.unlockableFeatures.prioritySupportDesc,
      cost: 75,
      isUnlocked: userCoins >= 75,
      href: "/features/priority-support",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

          {/* User Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userCoins}</div>
                <div className="text-sm opacity-90">{t.yourCoins}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {t.level} {userLevel}
                </div>
                <div className="text-sm opacity-90">Player Level</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dailyStreak}</div>
                <div className="text-sm opacity-90">
                  {t.dailyStreak} {t.days}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <Gift className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t.dailyChallenge}</h2>
              <p className="text-lg mb-6 opacity-90">{t.completeDailyChallenge}</p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
                asChild
              >
                <Link href="/games/daily-challenge">
                  <Clock className="w-5 h-5 mr-2" />
                  Start Challenge
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Games Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Available Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Card
                key={game.id}
                className={`bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl border-0 ${
                  !game.isUnlocked ? "opacity-75" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                        <game.icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{game.name}</CardTitle>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {t.difficulty[game.difficulty as keyof typeof t.difficulty]}
                        </Badge>
                      </div>
                    </div>
                    {game.isUnlocked ? (
                      <Unlock className="w-6 h-6 text-green-600" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">{game.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span>
                        {game.coinsReward} {t.coinsReward}
                      </span>
                    </div>
                    {game.timeLimit && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {game.timeLimit} {t.minutes}
                        </span>
                      </div>
                    )}
                  </div>

                  {game.isUnlocked ? (
                    <Button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl" asChild>
                      <Link href={`/games/${game.id}`}>
                        <Gamepad2 className="w-5 h-5 mr-2" />
                        {t.playNow}
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed" disabled>
                      <Lock className="w-5 h-5 mr-2" />
                      {t.unlock} ({game.requiredCoins} coins)
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{t.achievements}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0 ${
                  achievement.isUnlocked ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        achievement.isUnlocked ? "bg-yellow-100" : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <achievement.icon
                        className={`w-8 h-8 ${achievement.isUnlocked ? "text-yellow-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>

                  {achievement.isUnlocked && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-yellow-600">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold">+{achievement.coinsReward} coins earned!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Unlockable Features */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">{t.featuresUnlock}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {unlockableFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{feature.name}</h3>
                    {feature.isUnlocked ? (
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">{t.locked}</Badge>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <Coins className="w-5 h-5" />
                      <span className="font-semibold">{feature.cost} coins</span>
                    </div>

                    {feature.isUnlocked ? (
                      <Button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl" asChild>
                        <Link href={feature.href}>Access Feature</Link>
                      </Button>
                    ) : (
                      <Button className="px-6 py-2 bg-gray-400 text-white rounded-xl cursor-not-allowed" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        {t.unlock}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
