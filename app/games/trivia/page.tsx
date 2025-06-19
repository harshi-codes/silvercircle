"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Coins, Trophy, CheckCircle, Star, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: "easy" | "medium" | "hard"
  explanation: string
}

export default function TriviaPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes total
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30) // 30 seconds per question
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const router = useRouter()

  const questions: Question[] = [
    {
      id: 1,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      category: "History",
      difficulty: "easy",
      explanation: "World War II ended in 1945 with the surrender of Japan in September.",
    },
    {
      id: 2,
      question: "Who painted the famous artwork 'The Starry Night'?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
      correctAnswer: 1,
      category: "Art",
      difficulty: "medium",
      explanation:
        "Vincent van Gogh painted 'The Starry Night' in 1889 while he was a patient at the Saint-Paul-de-Mausole asylum.",
    },
    {
      id: 3,
      question: "What was the first man-made object to reach the moon?",
      options: ["Apollo 11", "Luna 2", "Sputnik 1", "Explorer 1"],
      correctAnswer: 1,
      category: "Science",
      difficulty: "hard",
      explanation: "Luna 2, a Soviet space probe, was the first man-made object to reach the moon in 1959.",
    },
    {
      id: 4,
      question: "Which classic movie featured the line 'Here's looking at you, kid'?",
      options: ["Gone with the Wind", "Casablanca", "The Wizard of Oz", "Citizen Kane"],
      correctAnswer: 1,
      category: "Movies",
      difficulty: "medium",
      explanation: "This famous line was spoken by Humphrey Bogart to Ingrid Bergman in the 1942 film Casablanca.",
    },
    {
      id: 5,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
      category: "Geography",
      difficulty: "easy",
      explanation: "Canberra is the capital city of Australia, chosen as a compromise between Sydney and Melbourne.",
    },
    {
      id: 6,
      question: "Who wrote the novel 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correctAnswer: 0,
      category: "Literature",
      difficulty: "medium",
      explanation:
        "Harper Lee wrote 'To Kill a Mockingbird', published in 1960, which won the Pulitzer Prize for Fiction.",
    },
    {
      id: 7,
      question: "In what year was the first television broadcast made?",
      options: ["1925", "1926", "1927", "1928"],
      correctAnswer: 1,
      category: "Technology",
      difficulty: "hard",
      explanation: "The first television broadcast was made by John Logie Baird in 1926 in London.",
    },
    {
      id: 8,
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      category: "Science",
      difficulty: "easy",
      explanation:
        "Mars is known as the 'Red Planet' due to iron oxide (rust) on its surface giving it a reddish appearance.",
    },
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
    if (gameStarted && timeLeft > 0 && !gameCompleted && !showResult) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp()
            return 30
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      setGameCompleted(true)
    }
    return () => clearTimeout(timer)
  }, [gameStarted, timeLeft, gameCompleted, showResult])

  const translations = {
    en: {
      title: "Senior Trivia",
      backToGames: "Back to Games",
      timeLeft: "Time Left",
      questionTime: "Question Time",
      score: "Score",
      question: "Question",
      of: "of",
      startGame: "Start Game",
      resetGame: "Reset Game",
      nextQuestion: "Next Question",
      gameComplete: "Game Complete!",
      coinsEarned: "Coins Earned",
      playAgain: "Play Again",
      instructions: "Instructions",
      instructionText:
        "Answer trivia questions about history, culture, and general knowledge. You have 30 seconds per question!",
      congratulations: "Congratulations!",
      correct: "Correct!",
      incorrect: "Incorrect",
      correctAnswer: "Correct Answer",
      explanation: "Explanation",
      finalScore: "Final Score",
      correctAnswers: "Correct Answers",
      accuracy: "Accuracy",
      streak: "Best Streak",
      difficulty: "Medium",
      category: "Category",
      timeUp: "Time's Up!",
    },
    hi: {
      title: "वरिष्ठ ट्रिविया",
      backToGames: "खेलों पर वापस जाएं",
      timeLeft: "बचा समय",
      questionTime: "प्रश्न समय",
      score: "स्कोर",
      question: "प्रश्न",
      of: "का",
      startGame: "खेल शुरू करें",
      resetGame: "खेल रीसेट करें",
      nextQuestion: "अगला प्रश्न",
      gameComplete: "खेल पूरा!",
      coinsEarned: "सिक्के कमाए",
      playAgain: "फिर से खेलें",
      instructions: "निर्देश",
      instructionText: "इतिहास, संस्कृति और सामान्य ज्ञान के बारे में प्रश्नों के उत्तर दें। आपके पास प्रति प्रश्न 30 सेकंड हैं!",
      congratulations: "बधाई हो!",
      correct: "सही!",
      incorrect: "गलत",
      correctAnswer: "सही उत्तर",
      explanation: "व्याख्या",
      finalScore: "अंतिम स्कोर",
      correctAnswers: "सही उत्तर",
      accuracy: "सटीकता",
      streak: "सर्वश्रेष्ठ श्रृंखला",
      difficulty: "मध्यम",
      category: "श्रेणी",
      timeUp: "समय समाप्त!",
    },
  }

  const t = translations[language as keyof typeof translations]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === currentQuestion.correctAnswer
    if (isCorrect) {
      const points = getDifficultyPoints(currentQuestion.difficulty) + getTimeBonus()
      setScore((prev) => prev + points)
      setCorrectAnswers((prev) => prev + 1)
      setStreak((prev) => {
        const newStreak = prev + 1
        setMaxStreak((current) => Math.max(current, newStreak))
        return newStreak
      })
    } else {
      setStreak(0)
    }
  }

  const handleTimeUp = () => {
    if (!showResult) {
      setSelectedAnswer(null)
      setShowResult(true)
      setStreak(0)
    }
  }

  const getDifficultyPoints = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 10
      case "medium":
        return 15
      case "hard":
        return 25
      default:
        return 10
    }
  }

  const getTimeBonus = () => {
    if (questionTimeLeft > 20) return 5
    if (questionTimeLeft > 10) return 3
    return 1
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setQuestionTimeLeft(30)
    } else {
      setGameCompleted(true)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(300)
    setQuestionTimeLeft(30)
    setScore(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameCompleted(false)
    setCorrectAnswers(0)
    setStreak(0)
    setMaxStreak(0)
  }

  const calculateCoinsEarned = () => {
    let coins = score // Base score
    if (correctAnswers === questions.length) coins += 50 // Perfect score
    if (maxStreak >= 5) coins += 25 // Good streak
    return coins
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
            <Badge className="bg-yellow-100 text-yellow-800">{t.difficulty}</Badge>
          </div>

          {!gameStarted ? (
            /* Start Screen */
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
              <CardContent className="p-12 text-center">
                <Trophy className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t.instructions}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">{t.instructionText}</p>
                <Button
                  onClick={startGame}
                  size="lg"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg"
                >
                  <Star className="w-6 h-6 mr-2" />
                  {t.startGame}
                </Button>
              </CardContent>
            </Card>
          ) : gameCompleted ? (
            /* Results Screen */
            <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-0">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.congratulations}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t.gameComplete}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.finalScore}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.correctAnswers}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {correctAnswers}/{questions.length}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.accuracy}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {Math.round((correctAnswers / questions.length) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.streak}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{maxStreak}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-300 text-lg">{t.coinsEarned}</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-6 h-6 text-yellow-500" />
                    <span className="font-bold text-yellow-600 text-xl">{calculateCoinsEarned()}</span>
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
          ) : (
            /* Game Screen */
            <div className="space-y-6">
              {/* Game Header */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
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
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {t.question} {currentQuestionIndex + 1} {t.of} {questions.length}
                      </div>
                      <div className="text-lg font-semibold text-orange-600">
                        {t.questionTime}: {questionTimeLeft}s
                      </div>
                    </div>
                  </div>
                  <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
                </CardContent>
              </Card>

              {/* Question Card */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">{currentQuestion.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  <div className="grid gap-4 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`p-6 text-left text-lg rounded-xl transition-all duration-200 ${
                          showResult
                            ? index === currentQuestion.correctAnswer
                              ? "bg-green-200 text-green-800 border-2 border-green-400"
                              : selectedAnswer === index
                                ? "bg-red-200 text-red-800 border-2 border-red-400"
                                : "bg-gray-100 text-gray-600"
                            : selectedAnswer === index
                              ? "bg-purple-200 text-purple-800 border-2 border-purple-400"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                          {showResult && index === currentQuestion.correctAnswer && (
                            <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
                          )}
                          {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                            <X className="w-6 h-6 text-red-600 ml-auto" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                          {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.incorrect}
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300">{currentQuestion.explanation}</p>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={nextQuestion}
                          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                        >
                          {currentQuestionIndex < questions.length - 1 ? t.nextQuestion : t.gameComplete}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t.correctAnswers}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{streak}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Current Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{maxStreak}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Best Streak</div>
                    </div>
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
