"use client"

import { useEffect, useState } from 'react'
import { Calendar, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Activity {
  _id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  type?: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities')
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#c2410c] text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Activities & Events</h1>
          <p className="text-lg text-white/90 max-w-2xl">Explore our vibrant campus life and student activities</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-40"></div>
                <div className="p-4">
                  <div className="bg-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded mb-4"></div>
                  <div className="bg-gray-200 h-3 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                </div>
              </Card>
            ))
          ) : (
            activities.map((activity) => (
              <Card key={activity._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#c2410c] h-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold">{activity.images.length}</div>
                    <div className="text-sm">Photos</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-bold text-gray-900 flex-1">{activity.title}</h3>
                    {activity.type && (
                      <span className="text-xs font-semibold px-2 py-1 bg-[#fbbf24] text-gray-900 rounded">
                        {activity.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#1e3a8a]" />
                      <span>{formatDate(activity.date)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-12 text-center">Recent Activities</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {loading ? (
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-4 animate-pulse">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    {idx < 2 && <div className="w-1 h-16 bg-gray-200 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="bg-gray-200 h-5 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-1"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              activities.slice(0, 3).map((activity, idx) => (
                <div key={activity._id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#1e3a8a] rounded-full" />
                    {idx < 2 && <div className="w-1 h-16 bg-gray-300 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-heading font-bold text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(activity.date)}</p>
                    <p className="text-sm text-gray-600">{activity.images.length} photos</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
