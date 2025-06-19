"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coins, Star, Gift, Calendar, Target, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Challenge {
  id: string
  title: string
  description: string
  type: "word-puzzle" | "memory-match" | "trivia" | "sudoku"
  difficulty: "easy" | "medium" | "hard"
  baseReward: number
  bonusReward: number
  timeLimit: number
  isCompleted: boolean
  completedAt?: Date
}

export default function DailyChallenePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(5)
  const [totalCoins, setTotalCoins] = useState(150)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      title: "Daily Challenge",
      backToGames: "Back to Games",
      todaysChallenge: "Today's Challenge",
      currentStreak: "Current Streak",
      days: "days",
      totalCoins: "Total Coins",
      startChallenge: "Start Challenge",
      completed: "Completed",
      baseReward: "Base Reward",
      bonusReward: "Streak Bonus",
      timeLimit: "Time Limit",
      minutes: "min",
      difficulty: "Difficulty",
      description: "Complete daily challenges to earn bonus coins and maintain your streak!",
      streakBonus: "Streak Bonus",
      streakDescription: "Keep your streak alive to earn bigger rewards!",
      comingSoon: "Coming Soon",
      newChallengeIn: "New challenge in",
      hours: "hours",
      challengeTypes: {
        "word-puzzle": "Word Puzzle",
        "memory-match": "Memory Match",
        trivia: "Trivia Quiz",
        sudoku: "Number Sudoku",
      },
      difficulties: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      },
    },
    hi: {
      title: "दैनिक चुनौती",
      backToGames: "खेलों पर वापस जाएं",
      todaysChallenge: "आज की चुनौती",
      currentStreak: "वर्तमान श्रृंखला",
      days: "दिन",
      totalCoins: "कुल सिक्के",
      startChallenge: "चुनौती शुरू करें",
      completed: "पूर्ण",
      baseReward: "मूल इनाम",
      bonusReward: "श्रृंखला बोनस",
      timeLimit: "समय सीमा",
      minutes: "मिनट",
      difficulty: "कठिनाई",
      description: "बोनस सिक्के कमाने और अपनी श्रृंखला बनाए रखने के लिए दैनिक चुनौतियां पूरी करें!",
      streakBonus: "श्रृंखला बोनस",
      streakDescription: "बड़े पुरस्कार कमाने के लिए अपनी श्रृंखला को जीवित रखें!",
      comingSoon: "जल्द आ रहा है",
      newChallengeIn: "नई चुनौती में",
      hours: "घंटे",
      challengeTypes: {
        "word-puzzle": "शब्द पहेली",
        "memory-match": "मेमोरी मैच",
        trivia: "ट्रिविया क्विज़",
        sudoku: "संख्या सुडोकू",
      },
      difficulties: {
        easy: "आसान",
        medium: "मध्यम",
        hard: "कठिन",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  // Today's challenge (changes daily)
  const todaysChallenge: Challenge = {
    id: "daily-" + new Date().toDateString(),
    title: "Memory Master Challenge",
    description: "Test your memory skills with a special 6x6 memory matching game!",
    type: "memory-match",
    difficulty: "medium",
    baseReward: 25,
    bonusReward: currentStreak * 2,
    timeLimit: 8,
    isCompleted: false,
  }

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "word-puzzle":
        return "🧩"
      case "memory-match":
        return "🧠"
      case "trivia":
        return "🎯"
      case "sudoku":
        return "🔢"
      default:
        return "🎮"
    }
  }

  const handleStartChallenge = () => {
    // Navigate to the specific game with daily challenge parameters
    switch (todaysChallenge.type) {
      case "memory-match":
        router.push("/games/memory-match?challenge=daily")
        break
      case "word-puzzle":
        router.push("/games/word-puzzle?challenge=daily")
        break
      case "trivia":
        router.push("/games/trivia?challenge=daily")
        break
      case "sudoku":
        router.push("/games/sudoku?challenge=daily")
        break
      default:
        router.push("/games")
    }
  }

  const getStreakMultiplier = () => {
    if (currentStreak >= 30) return 3
    if (currentStreak >= 14) return 2.5
    if (currentStreak >= 7) return 2
    return 1.5
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" className="mb-4 text-purple-600 border-purple-600 hover:bg-purple-50" asChild>
              <Link href="/games">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToGames}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.description}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentStreak}</div>
                <div className="text-sm opacity-90">
                  {t.currentStreak} {t.days}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalCoins}</div>
                <div className="text-sm opacity-90">{t.totalCoins}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">×{getStreakMultiplier()}</div>
                <div className="text-sm opacity-90">{t.streakBonus}</div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Challenge */}
          <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <Gift className="w-8 h-8 text-purple-600 mr-3" />
                  {t.todaysChallenge}
                </CardTitle>
                <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Challenge Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{getTypeIcon(todaysChallenge.type)}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{todaysChallenge.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{todaysChallenge.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t.difficulty}</div>
                      <Badge className={getDifficultyColor(todaysChallenge.difficulty)}>
                        {t.difficulties[todaysChallenge.difficulty as keyof typeof t.difficulties]}
                      </Badge>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t.timeLimit}</div>
                      <div className="font-bold text-gray-800 dark:text-white">
                        {todaysChallenge.timeLimit} {t.minutes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Rewards</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">{t.baseReward}</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{todaysChallenge.baseReward}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">{t.bonusReward}</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">+{todaysChallenge.bonusReward}</span>
                        </div>
                      </div>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-gray-800 dark:text-white">Total Possible</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-5 h-5 text-yellow-500" />
                          <span className="text-lg text-yellow-600">
                            {todaysChallenge.baseReward + todaysChallenge.bonusReward}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {todaysChallenge.isCompleted ? (
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">{t.completed}</h4>
                      <p className="text-green-600 dark:text-green-400">Come back tomorrow for a new challenge!</p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleStartChallenge}
                      size="lg"
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Target className="w-6 h-6 mr-2" />
                      {t.startChallenge}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak Information */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl rounded-3xl border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <Star className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t.streakBonus}</h2>
                <p className="text-xl mb-6 opacity-90">{t.streakDescription}</p>

                <div className="grid md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                    <div className="text-2xl font-bold">7+</div>
                    <div className="text-sm opacity-80">×2.0 Bonus</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                    <div className="text-2xl font-bold">14+</div>
                    <div className="text-sm opacity-80">×2.5 Bonus</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="text-sm opacity-80">×3.0 Bonus</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                    <div className="text-2xl font-bold">You</div>
                    <div className="text-sm opacity-80">×{getStreakMultiplier()} Bonus</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
