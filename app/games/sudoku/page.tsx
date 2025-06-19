"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VoiceNavigation } from "@/components/voice-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Coins, Trophy, RotateCcw, Lightbulb, Star, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SudokuCell {
  value: number
  isFixed: boolean
  isValid: boolean
}

export default function SudokuPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [score, setScore] = useState(0)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [grid, setGrid] = useState<SudokuCell[][]>([])
  const router = useRouter()

  // Easy Sudoku puzzle (pre-filled)
  const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]

  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
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
      title: "Number Sudoku",
      backToGames: "Back to Games",
      timeLeft: "Time Left",
      score: "Score",
      mistakes: "Mistakes",
      startGame: "Start Game",
      resetGame: "Reset Game",
      useHint: "Use Hint",
      hintsLeft: "hints left",
      gameComplete: "Game Complete!",
      coinsEarned: "Coins Earned",
      playAgain: "Play Again",
      instructions: "Instructions",
      instructionText: "Fill the 9×9 grid so that each column, row, and 3×3 box contains all digits from 1 to 9.",
      congratulations: "Congratulations!",
      timeBonus: "Time Bonus",
      perfectScore: "Perfect Score!",
      difficulty: "Hard",
      selectNumber: "Select a number",
      clear: "Clear",
    },
    hi: {
      title: "संख्या सुडोकू",
      backToGames: "खेलों पर वापस जाएं",
      timeLeft: "बचा समय",
      score: "स्कोर",
      mistakes: "गलतियां",
      startGame: "खेल शुरू करें",
      resetGame: "खेल रीसेट करें",
      useHint: "संकेत का उपयोग करें",
      hintsLeft: "संकेत बचे",
      gameComplete: "खेल पूरा!",
      coinsEarned: "सिक्के कमाए",
      playAgain: "फिर से खेलें",
      instructions: "निर्देश",
      instructionText: "9×9 ग्रिड को भरें ताकि प्रत्येक कॉलम, पंक्ति और 3×3 बॉक्स में 1 से 9 तक सभी अंक हों।",
      congratulations: "बधाई हो!",
      timeBonus: "समय बोनस",
      perfectScore: "परफेक्ट स्कोर!",
      difficulty: "कठिन",
      selectNumber: "एक संख्या चुनें",
      clear: "साफ़ करें",
    },
  }

  const t = translations[language as keyof typeof translations]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const initializeGame = () => {
    const newGrid: SudokuCell[][] = []
    for (let row = 0; row < 9; row++) {
      newGrid[row] = []
      for (let col = 0; col < 9; col++) {
        newGrid[row][col] = {
          value: initialPuzzle[row][col],
          isFixed: initialPuzzle[row][col] !== 0,
          isValid: true,
        }
      }
    }
    setGrid(newGrid)
  }

  const isValidMove = (row: number, col: number, num: number) => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c].value === num) return false
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col].value === num) return false
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && grid[r][c].value === num) return false
      }
    }

    return true
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gameStarted || gameCompleted || grid[row][col].isFixed) return
    setSelectedCell({ row, col })
  }

  const handleNumberInput = (num: number) => {
    if (!selectedCell || !gameStarted || gameCompleted) return

    const { row, col } = selectedCell
    if (grid[row][col].isFixed) return

    const newGrid = [...grid]
    newGrid[row][col].value = num

    if (isValidMove(row, col, num)) {
      newGrid[row][col].isValid = true
      if (solution[row][col] === num) {
        setScore((prev) => prev + 10)
      }
    } else {
      newGrid[row][col].isValid = false
      setMistakes((prev) => prev + 1)
    }

    setGrid(newGrid)

    // Check if puzzle is complete
    const isComplete = newGrid.every((row) => row.every((cell) => cell.value !== 0 && cell.isValid))

    if (isComplete) {
      setGameCompleted(true)
    }
  }

  const clearCell = () => {
    if (!selectedCell || !gameStarted || gameCompleted) return

    const { row, col } = selectedCell
    if (grid[row][col].isFixed) return

    const newGrid = [...grid]
    newGrid[row][col].value = 0
    newGrid[row][col].isValid = true
    setGrid(newGrid)
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(1800)
    setScore(0)
    setMistakes(0)
    setSelectedCell(null)
    setGameCompleted(false)
    setHintsUsed(0)
    initializeGame()
  }

  const useHint = () => {
    if (hintsUsed < 3 && !gameCompleted && selectedCell) {
      setHintsUsed(hintsUsed + 1)
      const { row, col } = selectedCell
      if (!grid[row][col].isFixed) {
        handleNumberInput(solution[row][col])
      }
    }
  }

  const calculateCoinsEarned = () => {
    let coins = score // Base score
    if (timeLeft > 900) coins += 25 // Time bonus
    if (mistakes === 0) coins += 30 // Perfect game
    if (mistakes <= 3) coins += 15 // Low mistakes
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
            <Badge className="bg-red-100 text-red-800">{t.difficulty}</Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Sudoku Grid</CardTitle>
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
                        <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
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
                      {/* Sudoku Grid */}
                      <div className="grid grid-cols-9 gap-1 mb-6 max-w-lg mx-auto bg-gray-800 p-2 rounded-lg">
                        {grid.map((row, rowIndex) =>
                          row.map((cell, colIndex) => (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                              className={`aspect-square text-lg font-bold transition-all duration-200 ${
                                cell.isFixed
                                  ? "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                                  : selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                    ? "bg-purple-200 text-purple-800 border-2 border-purple-500"
                                    : cell.value !== 0
                                      ? cell.isValid
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                        : "bg-red-100 text-red-800 hover:bg-red-200"
                                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                              } ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? "mb-1" : ""} ${
                                (colIndex + 1) % 3 === 0 && colIndex !== 8 ? "mr-1" : ""
                              }`}
                            >
                              {cell.value !== 0 ? cell.value : ""}
                            </button>
                          )),
                        )}
                      </div>

                      {/* Number Input */}
                      <div className="flex justify-center space-x-2 mb-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button
                            key={num}
                            onClick={() => handleNumberInput(num)}
                            disabled={!selectedCell}
                            className="w-12 h-12 text-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
                          >
                            {num}
                          </Button>
                        ))}
                        <Button
                          onClick={clearCell}
                          disabled={!selectedCell}
                          className="px-4 h-12 bg-red-200 hover:bg-red-300 text-red-800 rounded-lg disabled:opacity-50"
                        >
                          {t.clear}
                        </Button>
                      </div>

                      {/* Game Controls */}
                      <div className="flex justify-center space-x-4">
                        <Button
                          onClick={useHint}
                          disabled={hintsUsed >= 3 || !selectedCell}
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
                      <span className="text-gray-600 dark:text-gray-300">{t.mistakes}</span>
                      <span className="font-semibold text-red-600">{mistakes}/5</span>
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

              {/* Tips */}
              <Card className="bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg rounded-2xl border-0">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Sudoku Tips</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Start with easy numbers</li>
                    <li>• Look for single possibilities</li>
                    <li>• Use elimination method</li>
                    <li>• Check rows, columns, boxes</li>
                  </ul>
                </CardContent>
              </Card>
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
                      <span className="text-gray-600 dark:text-gray-300">Final Score</span>
                      <span className="font-semibold">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Mistakes</span>
                      <span className="font-semibold">{mistakes}</span>
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
