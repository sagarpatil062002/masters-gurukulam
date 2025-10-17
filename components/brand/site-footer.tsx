"use client"

import Link from "next/link"
import { Facebook, Youtube, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
          {/* About Us Column */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              Master's Gurukulam is dedicated to providing quality education and comprehensive exam preparation for
              students aspiring to excel in their academic careers.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-600 hover:text-[#1e3a8a]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#1e3a8a]">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#1e3a8a]">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#1e3a8a]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#1e3a8a]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/exams" className="text-gray-600 hover:text-[#1e3a8a]">
                  Exams
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-600 hover:text-[#1e3a8a]">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#1e3a8a]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <span>info@mastersgurukulam.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Education Street, City, State 560001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Stay updated with our latest news and announcements.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="text-sm" />
              <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6 text-center text-sm text-gray-600">
          © 2025 Master's Gurukulam. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
