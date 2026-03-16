import type { Metadata } from 'next'
import { CountryCard } from '@/components/country-card'
import { getTranslations, type Locale } from '@/lib/i18n'
import { countries } from '@/lib/data'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'ru' ? 'Номера из 50+ стран мира' : 'Numbers from 50+ Countries',
    description: locale === 'ru'
      ? 'Виртуальные номера из США, России, Германии, Великобритании и других стран'
      : 'Virtual numbers from USA, Russia, Germany, UK and other countries',
  }
}

export default async function CountriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">{t.countries.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.countries.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} locale={locale as Locale} />
          ))}
        </div>
      </div>
    </div>
  )
}
