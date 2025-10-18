"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Moon, Menu, LayoutDashboard, Video, BookOpen as BookIcon, Users, Building, MessageSquare, GraduationCap, Calendar, FileText, Shield, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/exams", label: "Exams" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" },
]

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/video-manager", label: "Video Manager", icon: Video },
  { href: "/admin/courses-manager", label: "Courses Manager", icon: BookIcon },
  { href: "/admin/faculty-manager", label: "Faculty Manager", icon: Users },
  { href: "/admin/facilities-manager", label: "Facilities Manager", icon: Building },
  { href: "/admin/testimonials-manager", label: "Testimonials Manager", icon: MessageSquare },
  { href: "/admin/exams-manager", label: "Exams Manager", icon: GraduationCap },
  { href: "/admin/activities-manager", label: "Activities Manager", icon: Calendar },
  { href: "/admin/contact-enquiry-manager", label: "Contact & Enquiry Manager", icon: FileText },
  { href: "/admin/user-role-management", label: "User & Role Management", icon: Shield },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  const currentNavItems = isAdminRoute ? adminNavItems : publicNavItems

  return (
    <header className="w-full border-b bg-white text-gray-900 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#1e3a8a]" />
          <span className="font-heading text-lg font-bold text-[#1e3a8a] hidden sm:inline">
            Master's Gurukulam
          </span>
        </Link>

        {/* Navigation - Same styling for both admin and public */}
        <nav className="hidden items-center gap-8 md:flex">
          {isAdminRoute ? (
            <>
              {adminNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#1e3a8a]"
                        : "hover:text-[#1e3a8a]"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/"
                target="_blank"
                className="text-sm font-medium hover:text-[#1e3a8a] transition-colors"
              >
                Back to Website
              </Link>
            </>
          ) : (
            publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-[#1e3a8a] transition-colors"
              >
                {item.label}
              </Link>
            ))
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!isAdminRoute && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Moon className="h-5 w-5 text-gray-600" />
            </button>
          )}
          {!isAdminRoute && (
            <Link href="/admin/login" className="hidden sm:inline-block">
              <Button
                variant="outline"
                className="text-sm border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent"
              >
                Admin Login
              </Button>
            </Link>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-6 mt-6">
                {isAdminRoute ? (
                  <>
                    {adminNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-6 border-t border-gray-200">
                      <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full text-sm border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent"
                        >
                          Back to Website
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {publicNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-6 border-t border-gray-200">
                      <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full text-sm border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent"
                        >
                          Admin Login
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
