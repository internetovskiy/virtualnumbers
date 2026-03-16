import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/service-card'
import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import { getTranslations, type Locale, locales } from '@/lib/i18n'
import { services, countries, getCountryById } from '@/lib/data'

export async function generateStaticParams() {
  const params: { locale: string; country: string }[] = []
  
  for (const locale of locales) {
    for (const country of countries) {
      params.push({ locale, country: country.id })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }): Promise<Metadata> {
  const { locale, country: countryId } = await params
  const country = getCountryById(countryId)
  
  if (!country) return {}
  
  const countryName = country.name[locale as Locale]
  
  return {
    title: locale === 'ru'
      ? `Виртуальные номера ${countryName} | Купить номер ${country.code}`
      : `Virtual Numbers ${countryName} | Buy ${country.code} Number`,
    description: locale === 'ru'
      ? `Купить виртуальный номер ${countryName} для SMS верификации. ${country.numbersAvailable.toLocaleString()} номеров в наличии от $${country.priceFrom}.`
      : `Buy virtual ${countryName} number for SMS verification. ${country.numbersAvailable.toLocaleString()} numbers available from $${country.priceFrom}.`,
  }
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country: countryId } = await params
  const country = getCountryById(countryId)
  
  if (!country) {
    notFound()
  }
  
  const t = getTranslations(locale as Locale)

  const features = locale === 'ru'
    ? [
        'Мгновенная активация номера',
        'Поддержка всех популярных сервисов',
        'Гарантия получения SMS',
        'Выгодные цены',
      ]
    : [
        'Instant number activation',
        'All popular services supported',
        'SMS delivery guarantee',
        'Competitive prices',
      ]

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-6xl md:text-8xl mb-6 block">{country.flag}</span>
          
          <h1 className="text-3xl md:text-5xl font-bold text-balance">
            {locale === 'ru'
              ? `Виртуальные номера ${country.name[locale as Locale]}`
              : `Virtual Numbers ${country.name[locale as Locale]}`}
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {locale === 'ru'
              ? `${country.numbersAvailable.toLocaleString()} номеров в наличии для SMS верификации в любых сервисах.`
              : `${country.numbersAvailable.toLocaleString()} numbers available for SMS verification in any service.`}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8">
              <a href="https://virtualsim.io" target="_blank" rel="noopener noreferrer">
                {locale === 'ru' ? 'Получить номер' : 'Get Number'}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              {locale === 'ru' ? 'от' : 'from'} <span className="font-semibold text-foreground">${country.priceFrom.toFixed(2)}</span>
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

        {/* Services */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {locale === 'ru' ? 'Доступные сервисы' : 'Available Services'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {locale === 'ru'
                  ? `Выберите сервис для номера ${country.name[locale as Locale]}`
                  : `Choose a service for ${country.name[locale as Locale]} number`}
              </p>
            </div>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t.services.viewAll}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
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

        {/* Other Countries */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">
            {locale === 'ru' ? 'Другие страны' : 'Other Countries'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {countries
              .filter((c) => c.id !== country.id)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/${locale}/country/${c.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-foreground/20 hover:bg-muted transition-colors"
                >
                  <span>{c.flag}</span>
                  {c.name[locale as Locale]}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
