import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Deep Indian - Premium LED Lighting Solutions | Energy Efficient Bulbs",
  description:
    "Deep Indian manufactures high-quality, energy-efficient LED bulbs for Indian homes and businesses. Save up to 80% on electricity bills with our premium LED lighting solutions.",
  keywords:
    "LED bulbs, energy efficient lighting, Indian LED manufacturer, smart bulbs, commercial lighting, Deep Indian",
  authors: [{ name: "Deep Indian" }],
  creator: "Deep Indian",
  publisher: "Deep Indian",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://deepindian.in",
    title: "Deep Indian - Premium LED Lighting Solutions",
    description: "Lighting Up Every Indian Home, One Bulb at a Time. Premium LED bulbs with 25,000+ hours lifespan.",
    siteName: "Deep Indian",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Indian - Premium LED Lighting Solutions",
    description: "Energy-efficient LED bulbs made in India for Indian homes and businesses.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#f97316",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Deep Indian" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
