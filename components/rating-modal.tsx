"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Heart } from "lucide-react"

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

export function RatingModal({ isOpen, onClose, language }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const translations = {
    en: {
      title: "How are we doing?",
      subtitle: "Your feedback helps us create a better experience for our community",
      submitButton: "Submit Rating",
      thankYou: "Thank you for your feedback!",
      closeButton: "Close",
    },
    hi: {
      title: "हम कैसा कर रहे हैं?",
      subtitle: "आपकी प्रतिक्रिया हमें बेहतर अनुभव बनाने में मदद करती है",
      submitButton: "रेटिंग सबमिट करें",
      thankYou: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
      closeButton: "बंद करें",
    },
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setRating(0)
      }, 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.title}</DialogTitle>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{t.subtitle}</p>
        </DialogHeader>

        {!submitted ? (
          <div className="py-6">
            <div className="flex justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-2 transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.submitButton}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.thankYou}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your rating: {rating} star{rating !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
