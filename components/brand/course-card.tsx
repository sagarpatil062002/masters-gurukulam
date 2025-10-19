"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Send } from "lucide-react"
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

type CourseCardProps = {
  title: string
  duration: string
  description: string
}

export function CourseCard({ title, duration, description }: CourseCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
        body: JSON.stringify({
          ...formData,
          course: title,
          subject: `Course Enquiry: ${title}`
        }),
      })

      if (response.ok) {
        // Send email notification to admin
        await sendEmailClient({
          type: 'contact',
          data: {
            ...formData,
            message: `Course Enquiry for: ${title}\n\n${formData.message}`
          }
        })

        setSubmitMessage("Thank you for your enquiry! We'll get back to you soon.")
        setFormData({ name: "", email: "", mobile: "", message: "" })
        setTimeout(() => setIsDialogOpen(false), 2000)
      } else {
        setSubmitMessage("Failed to send enquiry. Please try again.")
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="h-full border-t-4" style={{ borderTopColor: "var(--color-accent)" }}>
      <CardHeader>
        <CardTitle className="font-heading text-xl">{title}</CardTitle>
        <span className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
          {duration}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-accent">Apply Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enquire About {title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Phone</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows={3}
                />
              </div>
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${submitMessage.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="secondary">View Details</Button>
      </CardFooter>
    </Card>
  )
}
