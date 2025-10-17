"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Video {
  _id: string;
  url: string;
  type: 'youtube' | 'mp4';
}

export function Hero() {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch('/api/videos')
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setVideo(data[0]) // Use the first video
          }
        }
      } catch (error) {
        console.error('Failed to fetch video:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [])

  const getVideoSrc = (video: Video) => {
    if (video.type === 'youtube') {
      // Extract YouTube video ID and create embed URL
      const videoId = video.url.split('v=')[1]?.split('&')[0] || video.url.split('/').pop()
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`
    }
    return video.url
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center hero-mobile-fallback">
      {/* Video Background */}
      {!loading && video && (
        video.type === 'youtube' ? (
          <iframe
            src={getVideoSrc(video)}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Educational institution promotional video"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/campus-learning-video-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Educational institution promotional video"
            preload="metadata"
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}

      {/* Fallback video if no dynamic video */}
      {loading && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/campus-learning-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Educational institution promotional video"
          preload="metadata"
        >
          <source src="/master_gurukulam.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-32 text-white w-full">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="font-heading text-balance text-4xl font-bold md:text-5xl lg:text-6xl text-white">
            Excellence in Education
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Empowering students to achieve their dreams through quality education and comprehensive exam preparation
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-[#ea580c] hover:bg-[#d94a08] text-white font-semibold shadow-lg focus:ring-2 focus:ring-[#ea580c] focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Register for exams"
            >
              Register for Exams
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold bg-transparent shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Learn more about us"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
