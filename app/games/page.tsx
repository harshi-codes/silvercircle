"use client"

import { useTranslations } from "next-intl"
import { BrainCircuit, Dice3, CalculatorIcon as Math } from "lucide-react"
import Link from "next/link"

const GamesPage = () => {
  const t = useTranslations("Games")

  const games = [
    {
      title: t.mathMaster,
      description: t.mathMasterDesc,
      icon: Math,
      href: "/games/math-master",
      difficulty: t.medium,
      time: "10 min",
      coins: "10-20",
      color: "from-red-600 to-orange-600",
    },
    {
      title: t.memoryMatch,
      description: t.memoryMatchDesc,
      icon: BrainCircuit,
      href: "/games/memory-match",
      difficulty: t.easy,
      time: "5 min",
      coins: "5-10",
      color: "from-blue-600 to-purple-600",
    },
    {
      title: t.diceDreams,
      description: t.diceDreamsDesc,
      icon: Dice3,
      href: "/games/dice-dreams",
      difficulty: t.hard,
      time: "15 min",
      coins: "20-40",
      color: "from-yellow-600 to-amber-600",
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <Link
            key={index}
            href={game.href}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className={`p-6 rounded-t-lg bg-gradient-to-br ${game.color}`}>
              <game.icon className="w-8 h-8 text-white" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
              <p className="text-gray-600 flex-grow">{game.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {t.difficulty}: {game.difficulty}
                </p>
                <p className="text-sm text-gray-500">
                  {t.time}: {game.time}
                </p>
                <p className="text-sm text-gray-500">
                  {t.coins}: {game.coins}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GamesPage
