import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monuments 2077 | Cyberpunk World Heritage',
  description: 'Explore world monuments reimagined in the cyberpunk future of 2077',
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
