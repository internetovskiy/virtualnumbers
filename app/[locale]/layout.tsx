import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { locales, getTranslations, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  if (!locales.includes(locale as Locale)) {
    return {}
  }
  
  const t = getTranslations(locale as Locale)
  
  return {
    title: {
      default: t.meta.title,
      template: `%s | VirtualSim`,
    },
    description: t.meta.description,
    keywords: locale === 'ru' 
      ? ['виртуальный номер', 'sms верификация', 'telegram номер', 'whatsapp номер', 'купить номер']
      : ['virtual number', 'sms verification', 'telegram number', 'whatsapp number', 'buy number'],
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </div>
  )
}
