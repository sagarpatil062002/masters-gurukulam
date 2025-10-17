"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Moon, Menu } from "lucide-react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white text-gray-900 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#1e3a8a]" />
          <span className="font-heading text-lg font-bold text-[#1e3a8a] hidden sm:inline">
            Master&apos;s Gurukulam
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-[#1e3a8a] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-[#1e3a8a] transition-colors">
            About
          </Link>
          <Link href="/exams" className="text-sm font-medium hover:text-[#1e3a8a] transition-colors">
            Exams
          </Link>
          <Link href="/activities" className="text-sm font-medium hover:text-[#1e3a8a] transition-colors">
            Activities
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-[#1e3a8a] transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Moon className="h-5 w-5 text-gray-600" />
          </button>
          <Link href="/admin/login" className="hidden sm:inline-block">
            <Button
              variant="outline"
              className="text-sm border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 bg-transparent"
            >
              Admin Login
            </Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-6 mt-6">
                <Link
                  href="/"
                  className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/exams"
                  className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Exams
                </Link>
                <Link
                  href="/activities"
                  className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Activities
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium text-gray-900 hover:text-[#1e3a8a] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
