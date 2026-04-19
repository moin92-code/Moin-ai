import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Moin AI - Your Intelligent Study Assistant",
  description: "An AI-powered study assistant to help you learn faster and smarter",
}

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
