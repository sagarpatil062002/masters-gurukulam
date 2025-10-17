'use client'

import { useEffect, useState } from 'react'
import { CourseCard } from "./course-card"

interface Course {
  _id: string;
  title: string;
  duration: string;
  description: string;
}

export function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses')
        if (response.ok) {
          const data = await response.json()
          setCourses(data)
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <section id="courses" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Our Courses</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Comprehensive programs designed to help you excel in your academic journey
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Our Courses</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Comprehensive programs designed to help you excel in your academic journey
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course._id} {...course} />
        ))}
      </div>
    </section>
  )
}
