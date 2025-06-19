"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"

export default function MyProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    interests: "",
    bio: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load from localStorage if available
    const data = localStorage.getItem("myProfile")
    if (data) setForm(JSON.parse(data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("myProfile", JSON.stringify(form))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        darkMode={false}
        setDarkMode={() => {}}
        language="en"
        setLanguage={() => {}}
        voiceEnabled={false}
        setVoiceEnabled={() => {}}
      />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto shadow-2xl rounded-3xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Enter and save your information below.</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <Input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                placeholder="Full Name"
                required
              />
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                placeholder="Email Address"
                required
              />
              <Input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                placeholder="Age"
                required
              />
              <Input
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                placeholder="Location"
                required
              />
              <Input
                name="interests"
                type="text"
                value={form.interests}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500"
                placeholder="Interests (comma separated)"
              />
              <Textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="text-lg py-3 rounded-xl border-2 focus:border-purple-500 min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
              <Button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                Save Profile
              </Button>
              {saved && <p className="text-green-600 text-center mt-2">Profile saved!</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 