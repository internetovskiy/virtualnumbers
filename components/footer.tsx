import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'
import { services, countries } from '@/lib/data'

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale)

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <span className="text-sm font-bold text-background">VS</span>
              </div>
              <span className="text-lg font-semibold">VirtualSim</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/${locale}/service/${service.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.countries}</h4>
            <ul className="space-y-2">
              {countries.slice(0, 5).map((country) => (
                <li key={country.id}>
                  <Link
                    href={`/${locale}/country/${country.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {country.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://virtualsim.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a
                  href="https://virtualsim.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a
                  href="https://virtualsim.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a
                  href="https://virtualsim.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VirtualSim. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale === 'ru' ? 'en' : 'ru'}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {locale === 'ru' ? 'English' : 'Русский'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
