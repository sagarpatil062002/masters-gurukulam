"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu, X, LayoutDashboard, Video, BookOpen, Users, Building, MessageSquare, GraduationCap, Calendar, FileText, Shield, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/video-manager', label: 'Video Manager', icon: Video },
  { href: '/admin/courses-manager', label: 'Courses Manager', icon: BookOpen },
  { href: '/admin/faculty-manager', label: 'Faculty Manager', icon: Users },
  { href: '/admin/facilities-manager', label: 'Facilities Manager', icon: Building },
  { href: '/admin/testimonials-manager', label: 'Testimonials Manager', icon: MessageSquare },
  { href: '/admin/exams-manager', label: 'Exams Manager', icon: GraduationCap },
  { href: '/admin/activities-manager', label: 'Activities Manager', icon: Calendar },
  { href: '/admin/contact-enquiry-manager', label: 'Contact & Enquiry Manager', icon: FileText },
  { href: '/admin/user-role-management', label: 'User & Role Management', icon: Shield },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="font-bold text-xl text-gray-900">
              Admin Panel
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            {/* Back to Website */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Back to Website
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
              {/* Back to Website */}
              <Link
                href="/"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                <ExternalLink className="mr-3 h-4 w-4" />
                Back to Website
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}