import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'

interface CountryCardProps {
  country: {
    id: string
    name: { ru: string; en: string }
    code: string
    flag: string
    numbersAvailable: number
    priceFrom: number
  }
  locale: Locale
}

export function CountryCard({ country, locale }: CountryCardProps) {
  const t = getTranslations(locale)

  return (
    <a
      href="https://virtualsim.io"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h3 className="font-semibold">{country.name[locale]}</h3>
          <p className="text-sm text-muted-foreground">
            {country.numbersAvailable.toLocaleString()} {t.countries.numbers}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">{t.countries.from}</p>
          <p className="font-semibold">${country.priceFrom.toFixed(2)}</p>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
    </a>
  )
}
