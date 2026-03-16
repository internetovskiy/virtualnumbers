import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CountryCard } from '@/components/country-card'
import { ArrowRightIcon, CheckIcon, serviceIcons } from '@/components/icons'
import { getTranslations, type Locale, locales } from '@/lib/i18n'
import { services, countries, getServiceById } from '@/lib/data'

export async function generateStaticParams() {
  const params: { locale: string; service: string }[] = []
  
  for (const locale of locales) {
    for (const service of services) {
      params.push({ locale, service: service.id })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; service: string }> }): Promise<Metadata> {
  const { locale, service: serviceId } = await params
  const service = getServiceById(serviceId)
  
  if (!service) return {}
  
  const serviceName = service.name[locale as Locale]
  
  return {
    title: locale === 'ru'
      ? `Виртуальный номер для ${serviceName} | Купить номер для регистрации`
      : `Virtual Number for ${serviceName} | Buy Number for Registration`,
    description: locale === 'ru'
      ? `Купить виртуальный номер для ${serviceName}. Мгновенная активация, низкие цены от $${service.price}. Номера из 50+ стран.`
      : `Buy virtual number for ${serviceName}. Instant activation, low prices from $${service.price}. Numbers from 50+ countries.`,
  }
}

export default async function ServiceNumbersPage({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service: serviceId } = await params
  const service = getServiceById(serviceId)
  
  if (!service) {
    notFound()
  }
  
  const t = getTranslations(locale as Locale)
  const IconComponent = serviceIcons[service.icon]

  const features = locale === 'ru'
    ? [
        'Мгновенная доставка SMS',
        'Работает для любой страны',
        'Гарантия получения кода',
        'Поддержка 24/7',
      ]
    : [
        'Instant SMS delivery',
        'Works for any country',
        'Code delivery guarantee',
        '24/7 Support',
      ]

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div
            className="inline-flex h-20 w-20 items-center justify-center rounded-2xl mb-6"
            style={{ backgroundColor: `${service.color}15` }}
          >
            {IconComponent && <IconComponent className="h-10 w-10" />}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-balance">
            {locale === 'ru'
              ? `Виртуальный номер для ${service.name[locale as Locale]}`
              : `Virtual Number for ${service.name[locale as Locale]}`}
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {locale === 'ru'
              ? `Получите временный номер телефона для регистрации в ${service.name[locale as Locale]}. Мгновенная активация и гарантия получения SMS.`
              : `Get a temporary phone number for ${service.name[locale as Locale]} registration. Instant activation and SMS delivery guarantee.`}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8">
              <a href="https://virtualsim.io" target="_blank" rel="noopener noreferrer">
                {locale === 'ru' ? 'Получить номер' : 'Get Number'}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              {locale === 'ru' ? 'от' : 'from'} <span className="font-semibold text-foreground">${service.price.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
                  <CheckIcon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {locale === 'ru' ? 'Доступные страны' : 'Available Countries'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {locale === 'ru'
                  ? `Номера для ${service.name[locale as Locale]} из разных стран`
                  : `Numbers for ${service.name[locale as Locale]} from different countries`}
              </p>
            </div>
            <Link
              href={`/${locale}/countries`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t.countries.viewAll}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} locale={locale as Locale} />
            ))}
          </div>
        </div>

        {/* Other Services */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">
            {locale === 'ru' ? 'Другие сервисы' : 'Other Services'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {services
              .filter((s) => s.id !== service.id)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/${locale}/service/${s.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-foreground/20 hover:bg-muted transition-colors"
                >
                  {s.name[locale as Locale]}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
