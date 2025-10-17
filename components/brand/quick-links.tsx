"use client"

import Link from "next/link"
import { Trophy, BookOpen, Phone, Info } from "lucide-react"

const LINKS = [
  {
    href: "/exams",
    label: "Check Results",
    description: "View your exam results and answer keys",
    icon: Trophy,
  },
  {
    href: "/exams",
    label: "Register for Exams",
    description: "Sign up for upcoming examinations",
    icon: BookOpen,
  },
  {
    href: "/contact",
    label: "Contact Us",
    description: "Get in touch with our support team",
    icon: Phone,
  },
  {
    href: "/about",
    label: "About Us",
    description: "Learn more about our institution",
    icon: Info,
  },
]

export function QuickLinks() {
  return (
    <section className="bg-[#1e3a8a] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.label} href={link.href}>
                <div className="flex flex-col gap-3 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <Icon className="h-8 w-8 text-[#1e3a8a]" />
                  <h3 className="font-heading font-semibold text-[#1e3a8a]">{link.label}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
