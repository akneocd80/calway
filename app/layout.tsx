import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CalWay - Math & Physics Calculator',
  description: 'Interactive calculator for math and physics equations with drawing capabilities',
  keywords: 'calculator, math, physics, equations, drawing, education',
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'CalWay - Math & Physics Calculator',
    description: 'Interactive calculator for math and physics equations',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
