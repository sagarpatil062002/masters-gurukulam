"use client"

import { useEffect, useState } from 'react'
import { Calendar, FileText, Trophy, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Exam {
  _id: string;
  title: string;
  description: string;
  registrationStartDate: string;
  registrationEndDate: string;
  examFee: number;
  isRegistrationOpen: boolean;
  resultPublished: boolean;
  resultLink?: string;
  answerBookLink?: string;
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch('/api/exams')
        if (response.ok) {
          const data = await response.json()
          setExams(data)
        }
      } catch (error) {
        console.error('Failed to fetch exams:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExams()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatus = (exam: Exam) => {
    const now = new Date()
    const endDate = new Date(exam.registrationEndDate)
    return exam.isRegistrationOpen && now <= endDate ? "Open" : "Closed"
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#c2410c] text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Exams & Registration</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Register for our comprehensive exam series and track your progress
          </p>
        </div>
      </section>

      {/* Exams List */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="bg-gray-200 h-6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  </div>
                  <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-200 h-10 rounded"></div>
              </Card>
            ))
          ) : (
            exams.map((exam) => {
              const status = getStatus(exam)
              return (
                <Card key={exam._id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{exam.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-[#1e3a8a]" />
                      <span className="text-sm">Register by: {formatDate(exam.registrationEndDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Trophy className="h-4 w-4 text-[#c2410c]" />
                      <span className="text-sm font-semibold">₹{exam.examFee}</span>
                    </div>
                    {exam.resultPublished && (
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Results Published</span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                    disabled={status === "Closed"}
                    onClick={() => {
                      // TODO: Open registration form modal
                      alert('Registration form will be implemented with modal popup')
                    }}
                  >
                    {status === "Open" ? "Register Now" : "Registration Closed"}
                  </Button>
                </Card>
              )
            })
          )}
        </div>
      </section>

      {/* Check Results Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">Check Your Results</h2>
          <Card className="p-8 max-w-md mx-auto w-full">
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const rollNumber = formData.get('rollNumber') as string
              const email = formData.get('email') as string

              try {
                const response = await fetch(`/api/exam-results?rollNumber=${rollNumber}&email=${email}`)
                if (response.ok) {
                  const result = await response.json()
                  alert(`Result: ${result.score}/100\nStatus: ${result.status}`)
                } else {
                  alert('Result not found or not published yet.')
                }
              } catch (error) {
                alert('Error checking results. Please try again.')
              }
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input
                  name="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">Search Results</Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-2xl mx-auto w-full">
          {[
            {
              q: "How do I register for an exam?",
              a: "Click on the 'Register Now' button for your desired exam, fill in your details, and complete the payment.",
            },
            {
              q: "Can I download my admit card?",
              a: "Yes, admit cards are automatically sent to your registered email address before the exam date.",
            },
            {
              q: "What is the refund policy?",
              a: "Refunds are available up to 7 days before the exam date. Please contact our support team for assistance.",
            },
          ].map((faq, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-[#1e3a8a] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
