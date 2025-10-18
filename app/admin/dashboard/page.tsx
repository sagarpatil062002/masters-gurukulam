"use client"

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, FileText, Calendar, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DashboardStats {
  totalEnquiries: number;
  examRegistrations: number;
  activitiesPosted: number;
  contactMessages: number;
}

interface RecentEnquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    examRegistrations: 0,
    activitiesPosted: 0,
    contactMessages: 0,
  })
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [coursesRes, activitiesRes, contactsRes, examsRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/activities'),
          fetch('/api/contacts'),
          fetch('/api/exams')
        ])

        const courses = coursesRes.ok ? await coursesRes.json() : []
        const activities = activitiesRes.ok ? await activitiesRes.json() : []
        const contacts = contactsRes.ok ? await contactsRes.json() : []
        const exams = examsRes.ok ? await examsRes.json() : []

        setStats({
          totalEnquiries: courses.length,
          examRegistrations: exams.length,
          activitiesPosted: activities.length,
          contactMessages: contacts.length,
        })

        // Get recent 5 contacts as enquiries
        setRecentEnquiries(contacts.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statsConfig = [
    { label: "Total Courses", value: stats.totalEnquiries, icon: Users, color: "bg-blue-100 text-[#1e3a8a]" },
    { label: "Exam Registrations", value: stats.examRegistrations, icon: Calendar, color: "bg-orange-100 text-[#c2410c]" },
    { label: "Activities Posted", value: stats.activitiesPosted, icon: Activity, color: "bg-green-100 text-green-700" },
    { label: "Contact Messages", value: stats.contactMessages, icon: FileText, color: "bg-purple-100 text-purple-700" },
  ]

  const chartData = [
    { month: "Jan", enquiries: 120, registrations: 90 },
    { month: "Feb", enquiries: 150, registrations: 110 },
    { month: "Mar", enquiries: 180, registrations: 140 },
    { month: "Apr", enquiries: 200, registrations: 160 },
    { month: "May", enquiries: 220, registrations: 180 },
    { month: "Jun", enquiries: 250, registrations: 200 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your institution overview.</p>
        </div>
      </div>

        {/* Stats Grid */}
        <section className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              [...Array(4)].map((_, idx) => (
                <Card key={idx} className="p-6 animate-pulse">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-8 rounded"></div>
                    </div>
                    <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
                  </div>
                </Card>
              ))
            ) : (
              statsConfig.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </section>

        {/* Charts */}
        <section className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <Card className="p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Monthly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="enquiries" fill="#1e3a8a" />
                <Bar dataKey="registrations" fill="#c2410c" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
          <Card className="p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Recent Contact Messages</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Message</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(3)].map((_, idx) => (
                      <tr key={idx} className="border-b border-gray-100 animate-pulse">
                        <td className="py-3 px-4"><div className="bg-gray-200 h-4 rounded"></div></td>
                        <td className="py-3 px-4"><div className="bg-gray-200 h-4 rounded"></div></td>
                        <td className="py-3 px-4"><div className="bg-gray-200 h-4 rounded w-3/4"></div></td>
                        <td className="py-3 px-4"><div className="bg-gray-200 h-4 rounded w-1/2"></div></td>
                      </tr>
                    ))
                  ) : (
                    recentEnquiries.map((enquiry) => (
                      <tr key={enquiry._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{enquiry.name}</td>
                        <td className="py-3 px-4">{enquiry.email}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{enquiry.message}</td>
                        <td className="py-3 px-4">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
    </div>
  )
}
