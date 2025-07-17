"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Lightbulb } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar?: string
}

interface Value {
  icon: React.ReactNode
  title: string
  description: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Ayushi",
    role: "Frontend Developer",
    bio: "Ayushi is a passionate frontend developer who brings LifeDrop's vision to life through clean, accessible, and responsive user interfaces. She focuses on delivering a seamless and engaging experience for all users.",
  },
  {
    name: "Mithas",
    role: "Backend Developer",
    bio: "Mithas is the backbone of LifeDrop's infrastructure, building and maintaining secure, scalable, and efficient backend systems. She ensures smooth data handling and reliable performance across the platform.",
  },
]

const values: Value[] = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Compassion",
    description: "We care deeply about every life and every donation.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Trust",
    description: "We ensure safety, privacy, and transparency in every interaction.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community",
    description: "We believe in the power of people helping people.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Innovation",
    description: "We use technology to make giving and receiving blood easier and safer.",
  },
]

export default function AboutUs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div
          className={`transition-all duration-1000 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="pt-8 text-5xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-6">
              About LifeDrop
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              LifeDrop is dedicated to connecting blood donors with those in need. Our mission is to save lives by
              making blood donation accessible, safe, and efficient for everyone.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-16 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-red-600 flex items-center justify-center gap-2">
                <Heart className="h-8 w-8" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                To create a seamless, trustworthy, and supportive network for blood donation. 
                <br />
                We strive to empower communities, raise awareness, and ensure that no one has to wait for the blood they need.
              </p>
            </CardContent>
          </Card>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.name}
                  className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-blue-100">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">{member.bio}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-green-600">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 p-3 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 w-fit">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
