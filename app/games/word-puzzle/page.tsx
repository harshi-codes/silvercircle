"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Coins, Trophy, RotateCcw, Lightbulb, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WordPuzzlePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [score, setScore] = useState(0)
  const [wordsFound, setWordsFound] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const router = useRouter()

  // Sample word grid (8x8)
  const grid = [
    ["F", "R", "I", "E", "N", "D", "S", "H"],
    ["A", "M", "O", "V", "I", "E", "S", "A"],
    ["M", "U", "S", "I", "C", "K", "L", "P"],
    ["I", "S", "G", "A", "R", "D", "E", "N"],
    ["L", "I", "B", "R", "A", "R", "Y", "Y"],
    ["Y", "C", "O", "O", "K", "I", "N", "G"],
    ["B", "O", "O", "K", "S", "T", "R", "A"],
    ["T", "R", "A", "V", "E", "L", "I", "N"],
  ]

  const targetWords = [
    "FRIENDS",
    "MOVIES",
    "MUSIC",
    "GARDEN",
    "LIBRARY",
    "COOKING",
    "BOOKS",
    "TRAVEL",
    "FAMILY",
    "HAPPY",
  ]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameCompleted(true)
    }
    return () => clearTimeout(timer)
  }, [gameStarted, timeLeft, gameCompleted])

  const translations = {
    en: {
      title: "Word Puzzle",
      backToGames: "Back to Games",
      timeLeft: "Time Left",
      score: "Score",
      wordsFound: "Words Found",
      targetWords: "Find These Words",
      startGame: "Start Game",
      resetGame: "Reset Game",
      useHint: "Use Hint",
      hintsLeft: "hints left",
      gameComplete: "Game Complete!",
      coinsEarned: "Coins Earned",
      playAgain: "Play Again",
      instructions: "Instructions",
      instructionText:
        "Find all the hidden words in the grid. Words can be horizontal, vertical, or diagonal. Click and drag to select words.",
      congratulations: "Congratulations!",
      timeBonus: "Time Bonus",
      perfectScore: "Perfect Score!",
    },
    hi: {
      title: "शब्द पहेली",
      backToGames: "खेलों पर वापस जाएं",
      timeLeft: "बचा समय",
      score: "स्कोर",
      wordsFound: "मिले शब्द",
      targetWords: "ये शब्द खोजें",
      startGame: "खेल शुरू करें",
      resetGame: "खेल रीसेट करें",
      useHint: "संकेत का उपयोग करें",
      hintsLeft: "संकेत बचे",
      gameComplete: "खेल पूरा!",
      coinsEarned: "सिक्के कमाए",
      playAgain: "फिर से खेलें",
      instructions: "निर्देश",
      instructionText:
        "ग्रिड में छुपे सभी शब्दों को खोजें। शब्द क्षैतिज, लंबवत या तिरछे हो सकते हैं। शब्दों का चयन करने के लिए क्लिक करें और खींचें।",
      congratulations: "बधाई हो!",
      timeBonus: "समय बोनस",
      perfectScore: "परफेक्ट स्कोर!",
    },
  }

  const t = translations[language as keyof typeof translations]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCellClick = (index: number) => {
    if (!gameStarted || gameCompleted) return

    if (selectedCells.includes(index)) {
      setSelectedCells(selectedCells.filter((i) => i !== index))
    } else {
      setSelectedCells([...selectedCells, index])
    }
  }

  const checkWord = () => {
    // Simple word checking logic (in real game, this would be more sophisticated)
    const selectedLetters = selectedCells
      .map((index) => {
        const row = Math.floor(index / 8)
        const col = index % 8
        return grid[row][col]
      })
      .join("")

    if (targetWords.includes(selectedLetters) && !wordsFound.includes(selectedLetters)) {
      setWordsFound([...wordsFound, selectedLetters])
      setScore(score + selectedLetters.length * 10)
      setSelectedCells([])

      if (wordsFound.length + 1 === targetWords.length) {
        setGameCompleted(true)
      }
    } else {
      setSelectedCells([])
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(900)
    setScore(0)
    setWordsFound([])
    setSelectedCells([])
    setGameCompleted(false)
    setHintsUsed(0)
  }

  const useHint = () => {
    if (hintsUsed < 3 && !gameCompleted) {
      setHintsUsed(hintsUsed + 1)
      // In a real game, this would highlight the first letter of an unfound word
    }
  }

  const calculateCoinsEarned = () => {
    let coins = wordsFound.length * 5 // 5 coins per word
    if (timeLeft > 300) coins += 10 // Time bonus
    if (wordsFound.length === targetWords.length) coins += 20 // Completion bonus
    return coins
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
              <Link href="/games">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToGames}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">{t.title}</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Game Board</CardTitle>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">{formatTime(timeLeft)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-600">
                        <Trophy className="w-5 h-5" />
                        <span className="font-semibold">{score}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {!gameStarted ? (
                    <div className="text-center py-16">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t.instructions}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                          {t.instructionText}
                        </p>
                      </div>
                      <Button
                        onClick={startGame}
                        size="lg"
                        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg"
                      >
                        <Star className="w-6 h-6 mr-2" />
                        {t.startGame}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {/* Word Grid */}
                      <div className="grid grid-cols-8 gap-1 mb-6 max-w-md mx-auto">
                        {grid.flat().map((letter, index) => (
                          <button
                            key={index}
                            onClick={() => handleCellClick(index)}
                            className={`w-12 h-12 border-2 rounded-lg font-bold text-lg transition-all duration-200 ${
                              selectedCells.includes(index)
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900"
                            }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={checkWord}
                          disabled={selectedCells.length === 0}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Check Word
                        </Button>
                        <Button
                          onClick={useHint}
                          disabled={hintsUsed >= 3}
                          variant="outline"
                          className="px-6 py-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-xl"
                        >
                          <Lightbulb className="w-4 h-4 mr-2" />
                          {t.useHint} ({3 - hintsUsed} {t.hintsLeft})
                        </Button>
                        <Button
                          onClick={startGame}
                          variant="outline"
                          className="px-6 py-2 border-gray-500 text-gray-500 hover:bg-gray-50 rounded-xl"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {t.resetGame}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">{t.wordsFound}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {wordsFound.length}/{targetWords.length}
                      </span>
                    </div>
                    <Progress value={(wordsFound.length / targetWords.length) * 100} className="h-3" />

                    <div className="space-y-2">
                      {wordsFound.map((word) => (
                        <Badge key={word} className="bg-green-100 text-green-800 mr-2 mb-2">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Target Words */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">{t.targetWords}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {targetWords.map((word) => (
                      <div
                        key={word}
                        className={`p-2 rounded-lg text-center font-medium ${
                          wordsFound.includes(word)
                            ? "bg-green-100 text-green-800 line-through"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Game Stats */}
              {gameStarted && (
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Game Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.score}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.timeLeft}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Hints Used</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{hintsUsed}/3</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Game Complete Modal */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 max-w-md mx-4">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.congratulations}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t.gameComplete}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Words Found</span>
                      <span className="font-semibold">
                        {wordsFound.length}/{targetWords.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Final Score</span>
                      <span className="font-semibold">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.coinsEarned}</span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-600">{calculateCoinsEarned()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={startGame}
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                    >
                      {t.playAgain}
                    </Button>
                    <Button
                      onClick={() => router.push("/games")}
                      variant="outline"
                      className="flex-1 py-3 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl"
                    >
                      {t.backToGames}
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
