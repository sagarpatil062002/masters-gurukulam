"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Send, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { sendContactEmail } from "@/lib/email"

// Client-side email sending wrapper
const sendEmailClient = async (emailData: any) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    })
    return await response.json()
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Send email notification to admin
        await sendEmailClient({
          type: 'contact',
          data: formData
        })

        setSubmitMessage("Thank you for your message! We'll get back to you soon.")
        setFormData({ name: "", email: "", mobile: "", message: "" })
        setCaptchaVerified(false)
      } else {
        setSubmitMessage("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#c2410c] text-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/90 max-w-2xl">Get in touch with us for any queries or support</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 flex gap-4">
                <Phone className="h-6 w-6 text-[#1e3a8a] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Contact No.</h3>
                  <p className="text-gray-600 text-sm mt-1"><a href="tel:+919226227029" className="hover:text-[#1e3a8a]">+919226227029 (Prashant Khatkale, Administrator)</a></p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <Mail className="h-6 w-6 text-[#1e3a8a] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm mt-1"><a href="mailto:mastersgurukulam@gmail.com" className="hover:text-[#1e3a8a]">mastersgurukulam@gmail.com</a></p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <MapPin className="h-6 w-6 text-[#1e3a8a] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm mt-1">Master's Gurukulam, Valivade-Gandhinagar Main Road, Near Bajrang Talim, Valivade, Kolhapur</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}
              {/* Simple Captcha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Check</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-gray-100 px-3 py-2 rounded">What is 5 + 3?</span>
                  <input
                    type="text"
                    placeholder="Answer"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    onChange={(e) => setCaptchaVerified(e.target.value === '8')}
                    required
                  />
                  {captchaVerified && <Shield className="h-5 w-5 text-green-500" />}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !captchaVerified}
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-8 text-center">Find Us On Map</h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.2540665159145!2d74.31253699999999!3d16.7177799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1030078f20593%3A0x919429bf2ddec8af!2sMASTERS%20GURUKULAM%20(IIT%2C%20MEDICAL%20%26%20DEFENCE%20ACADEMY)!5e0!3m2!1sen!2sin!4v1734235405313!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Master's Gurukulam Location"
            />
          </div>
        </div>
      </section>
    </>
  )
}
