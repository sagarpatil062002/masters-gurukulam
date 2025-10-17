import { Hero } from "@/components/brand/hero"
import { CoursesSection } from "@/components/brand/courses-section"
import { FacilitiesPreview } from "@/components/brand/facilities-preview"
import { Testimonials } from "@/components/brand/testimonials"
import { QuickLinks } from "@/components/brand/quick-links"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoursesSection />
      <FacilitiesPreview />
      <Testimonials />
      <QuickLinks />
    </>
  )
}
