"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Facility {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export function FacilitiesPreview() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const response = await fetch('/api/facilities')
        if (response.ok) {
          const data = await response.json()
          setFacilities(data.slice(0, 4)) // Show only first 4 for preview
        }
      } catch (error) {
        console.error('Failed to fetch facilities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFacilities()
  }, [])

  if (loading) {
    return (
      <section id="facilities" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Our Facilities</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            State-of-the-art infrastructure designed for optimal learning
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/about">
            <Button variant="outline" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent">
              View All Facilities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section id="facilities" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Our Facilities</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          State-of-the-art infrastructure designed for optimal learning
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-8">
        {facilities.map((facility) => (
          <figure
            key={facility._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
          >
            <img src={facility.image || "/placeholder.svg"} alt={facility.name} className="h-40 w-full object-cover" />
            <figcaption className="px-4 py-3 text-sm font-medium text-gray-900">{facility.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="text-center">
        <Link href="/about">
          <Button variant="outline" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent">
            View All Facilities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
