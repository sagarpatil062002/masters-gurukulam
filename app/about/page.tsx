"use client"

import { useEffect, useState } from 'react'
import { Target, Lightbulb } from "lucide-react"

interface Course {
  _id: string;
  title: string;
  duration: string;
  description: string;
}

interface Faculty {
  _id: string;
  name: string;
  subject: string;
  qualification: string;
  bio: string;
  photo: string;
}

interface Facility {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function AboutPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, facultyRes, facilitiesRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/faculty'),
          fetch('/api/facilities')
        ])

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          setCourses(coursesData)
        }

        if (facultyRes.ok) {
          const facultyData = await facultyRes.json()
          setFaculty(facultyData)
        }

        if (facilitiesRes.ok) {
          const facilitiesData = await facilitiesRes.json()
          setFacilities(facilitiesData)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#c2410c] text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About Master's Gurukulam</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Dedicated to nurturing academic excellence and shaping future leaders through quality education
          </p>
        </div>
      </section>

      {/* Our Story & Mission/Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Master's Gurukulam has been a beacon of educational excellence, committed to providing comprehensive
              learning experiences that empower students to achieve their academic and career aspirations. With a legacy
              of quality education and mentorship, we continue to shape the future leaders of tomorrow.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex items-start gap-3 mb-3">
                <Target className="h-6 w-6 text-[#1e3a8a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Our Mission</h3>
                </div>
              </div>
              <p className="text-gray-600 ml-9">
                To provide quality education and comprehensive exam preparation that enables students to excel in their
                chosen fields and become responsible citizens.
              </p>
            </div>
            <div>
              <div className="flex items-start gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-[#1e3a8a] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900">Our Vision</h3>
                </div>
              </div>
              <p className="text-gray-600 ml-9">
                To be recognized as a leading educational institution that shapes future leaders through innovative
                teaching methodologies and holistic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-12">Programs Offered</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
              </div>
            ))
          ) : (
            courses.map((course) => (
              <div key={course._id} className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Facilities */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-12">Our Facilities</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="bg-gray-200 h-32 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded"></div>
              </div>
            ))
          ) : (
            facilities.map((facility) => (
              <div key={facility._id} className="rounded-lg border border-gray-200 p-6">
                <img src={facility.image || "/placeholder.svg"} alt={facility.name} className="w-full h-32 object-cover rounded mb-4" />
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{facility.name}</h3>
                <p className="text-gray-600 text-sm">{facility.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Our Faculty */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-12">Our Faculty</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6 text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded mb-1"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4 mx-auto"></div>
              </div>
            ))
          ) : (
            faculty.map((member) => (
              <div key={member._id} className="rounded-lg border border-gray-200 p-6 text-center">
                <img src={member.photo || "/placeholder-user.jpg"} alt={member.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-heading font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-[#1e3a8a] font-medium">{member.subject}</p>
                <p className="text-xs text-gray-600">{member.qualification}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}
