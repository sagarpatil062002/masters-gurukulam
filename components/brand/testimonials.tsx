"use client"

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Star } from "lucide-react"

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  feedback: string;
  image?: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Student Success Stories</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Hear what our students have to say about their journey with us
          </p>
        </div>
        <div className="mt-8">
          <Carousel>
            <CarouselContent>
              {[...Array(3)].map((_, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <article className="h-full rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow animate-pulse">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#ea580c] text-[#ea580c]" />
                      ))}
                    </div>
                    <div className="bg-gray-200 h-16 rounded mb-4"></div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">Student Success Stories</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Hear what our students have to say about their journey with us
        </p>
      </div>
      <div className="mt-8">
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial._id} className="md:basis-1/2 lg:basis-1/3">
                <article className="h-full rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#ea580c] text-[#ea580c]" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed">&ldquo;{testimonial.feedback}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-[#1e3a8a] font-medium">{testimonial.course}</div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
