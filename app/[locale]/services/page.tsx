import type { Metadata } from 'next'
import { ServiceCard } from '@/components/service-card'
import { getTranslations, type Locale, locales } from '@/lib/i18n'
import { services } from '@/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ru' ? 'Все сервисы для SMS верификации' : 'All Services for SMS Verification',
    description: locale === 'ru'
      ? 'Виртуальные номера для Telegram, WhatsApp, Google, Instagram и 500+ других сервисов'
      : 'Virtual numbers for Telegram, WhatsApp, Google, Instagram and 500+ other services',
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">{t.services.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale as Locale}
              buttonText={t.services.getNumber}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
