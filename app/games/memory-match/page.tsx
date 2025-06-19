"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Coins, Trophy, RotateCcw, Lightbulb, Star, Brain } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CardType {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatchPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [cards, setCards] = useState<CardType[]>([])
  const router = useRouter()

  const symbols = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🍀", "🌿"]

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

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second ? { ...card, isMatched: true, isFlipped: true } : card,
            ),
          )
          setMatchedPairs((prev) => prev + 1)
          setScore((prev) => prev + 100)
          setSelectedCards([])

          if (matchedPairs + 1 === symbols.length) {
            setGameCompleted(true)
          }
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) => (index === first || index === second ? { ...card, isFlipped: false } : card)),
          )
          setSelectedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [selectedCards, cards, matchedPairs, symbols.length])

  const translations = {
    en: {
      title: "Memory Match",
      backToGames: "Back to Games",
      timeLeft: "Time Left",
      score: "Score",
      moves: "Moves",
      pairs: "Pairs Found",
      startGame: "Start Game",
      resetGame: "Reset Game",
      useHint: "Use Hint",
      hintsLeft: "hints left",
      gameComplete: "Game Complete!",
      coinsEarned: "Coins Earned",
      playAgain: "Play Again",
      instructions: "Instructions",
      instructionText:
        "Click on cards to flip them and find matching pairs. Remember the positions and match all pairs to win!",
      congratulations: "Congratulations!",
      timeBonus: "Time Bonus",
      perfectScore: "Perfect Score!",
      difficulty: "Medium",
    },
    hi: {
      title: "मेमोरी मैच",
      backToGames: "खेलों पर वापस जाएं",
      timeLeft: "बचा समय",
      score: "स्कोर",
      moves: "चालें",
      pairs: "जोड़े मिले",
      startGame: "खेल शुरू करें",
      resetGame: "खेल रीसेट करें",
      useHint: "संकेत का उपयोग करें",
      hintsLeft: "संकेत बचे",
      gameComplete: "खेल पूरा!",
      coinsEarned: "सिक्के कमाए",
      playAgain: "फिर से खेलें",
      instructions: "निर्देश",
      instructionText: "कार्डों को फ्लिप करने के लिए क्लिक करें और मैचिंग जोड़े खोजें। स्थितियों को याद रखें!",
      congratulations: "बधाई हो!",
      timeBonus: "समय बोनस",
      perfectScore: "परफेक्ट स्कोर!",
      difficulty: "मध्यम",
    },
  }

  const t = translations[language as keyof typeof translations]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const initializeGame = () => {
    const gameCards: CardType[] = []
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5)

    shuffledSymbols.forEach((symbol, index) => {
      gameCards.push({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      })
    })

    setCards(gameCards)
  }

  const handleCardClick = (index: number) => {
    if (!gameStarted || gameCompleted || selectedCards.length >= 2) return
    if (cards[index].isFlipped || cards[index].isMatched) return

    setCards((prev) => prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card)))
    setSelectedCards((prev) => [...prev, index])
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(600)
    setScore(0)
    setMoves(0)
    setMatchedPairs(0)
    setSelectedCards([])
    setGameCompleted(false)
    setHintsUsed(0)
    initializeGame()
  }

  const useHint = () => {
    if (hintsUsed < 3 && !gameCompleted) {
      setHintsUsed(hintsUsed + 1)
      // Show a random unmatched pair briefly
      const unmatchedCards = cards.filter((card) => !card.isMatched)
      if (unmatchedCards.length >= 2) {
        const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)]
        const matchingCard = unmatchedCards.find(
          (card) => card.symbol === randomCard.symbol && card.id !== randomCard.id,
        )

        if (matchingCard) {
          setCards((prev) =>
            prev.map((card) =>
              card.id === randomCard.id || card.id === matchingCard.id ? { ...card, isFlipped: true } : card,
            ),
          )

          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === randomCard.id || card.id === matchingCard.id ? { ...card, isFlipped: false } : card,
              ),
            )
          }, 2000)
        }
      }
    }
  }

  const calculateCoinsEarned = () => {
    let coins = matchedPairs * 10 // 10 coins per pair
    if (timeLeft > 300) coins += 15 // Time bonus
    if (matchedPairs === symbols.length) coins += 25 // Completion bonus
    if (moves <= symbols.length * 1.5) coins += 10 // Efficiency bonus
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
            <Badge className="bg-yellow-100 text-yellow-800">{t.difficulty}</Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <UiCard className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
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
                        <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
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
                      {/* Memory Cards Grid */}
                      <div className="grid grid-cols-4 gap-4 mb-6 max-w-lg mx-auto">
                        {cards.map((card, index) => (
                          <button
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            disabled={card.isFlipped || card.isMatched || selectedCards.length >= 2}
                            className={`aspect-square rounded-xl text-4xl font-bold transition-all duration-300 transform hover:scale-105 ${
                              card.isFlipped || card.isMatched
                                ? card.isMatched
                                  ? "bg-green-200 text-green-800 border-2 border-green-400"
                                  : "bg-blue-200 text-blue-800 border-2 border-blue-400"
                                : "bg-gray-200 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {card.isFlipped || card.isMatched ? card.symbol : "?"}
                          </button>
                        ))}
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center space-x-4">
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
              </UiCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <UiCard className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">{t.pairs}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {matchedPairs}/{symbols.length}
                      </span>
                    </div>
                    <Progress value={(matchedPairs / symbols.length) * 100} className="h-3" />
                  </div>
                </CardContent>
              </UiCard>

              {/* Game Stats */}
              {gameStarted && (
                <UiCard className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">Game Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.score}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.moves}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{moves}</span>
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
                </UiCard>
              )}

              {/* Tips */}
              <UiCard className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg rounded-2xl border-0">
                <CardContent className="p-6 text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Memory Tips</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Focus on card positions</li>
                    <li>• Use visual patterns</li>
                    <li>• Take your time</li>
                    <li>• Practice regularly</li>
                  </ul>
                </CardContent>
              </UiCard>
            </div>
          </div>

          {/* Game Complete Modal */}
          {gameCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <UiCard className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0 max-w-md mx-4">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.congratulations}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t.gameComplete}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Pairs Found</span>
                      <span className="font-semibold">
                        {matchedPairs}/{symbols.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Moves</span>
                      <span className="font-semibold">{moves}</span>
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
              </UiCard>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
