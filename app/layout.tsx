import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NotificationBar } from "@/components/brand/notification-bar"
import { SiteHeader } from "@/components/brand/site-header"
import { SiteFooter } from "@/components/brand/site-footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Master's Gurukulam",
  description: "Academic excellence with modern pedagogy.",
  generator: "v0.app",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground flex flex-col min-h-screen">
        <NotificationBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
