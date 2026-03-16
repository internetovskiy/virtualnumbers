import Link from 'next/link'
import { ArrowRightIcon, serviceIcons } from '@/components/icons'
import type { Locale } from '@/lib/i18n'

interface ServiceCardProps {
  service: {
    id: string
    name: { ru: string; en: string }
    icon: string
    color: string
    price: number
  }
  locale: Locale
  buttonText: string
}

export function ServiceCard({ service, locale, buttonText }: ServiceCardProps) {
  const IconComponent = serviceIcons[service.icon]

  return (
    <a
      href="https://virtualsim.io"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${service.color}15` }}
      >
        {IconComponent && (
          <IconComponent className="h-6 w-6" />
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{service.name[locale]}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {locale === 'ru' ? 'от' : 'from'} ${service.price.toFixed(2)}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
        {buttonText}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  )
}
