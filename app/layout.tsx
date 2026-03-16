import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'VirtualSim - Виртуальные номера для SMS верификации',
    template: '%s | VirtualSim',
  },
  description: 'Получите виртуальные номера для регистрации в Telegram, WhatsApp, Google и других сервисах. Мгновенная активация, низкие цены, 50+ стран.',
  keywords: ['виртуальный номер', 'sms верификация', 'telegram номер', 'whatsapp номер', 'virtual number', 'sms verification'],
  authors: [{ name: 'VirtualSim' }],
  openGraph: {
    type: 'website',
    siteName: 'VirtualSim',
    title: 'VirtualSim - Virtual Phone Numbers',
    description: 'Get virtual phone numbers for SMS verification',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
