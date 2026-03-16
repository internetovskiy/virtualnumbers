import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/service-card'
import { CountryCard } from '@/components/country-card'
import { ArrowRightIcon, ZapIcon, ShieldIcon, HeadphonesIcon, TagIcon } from '@/components/icons'
import { getTranslations, type Locale } from '@/lib/i18n'
import { getPopularServices, countries } from '@/lib/data'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  const popularServices = getPopularServices()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              {t.hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {t.hero.title}
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              {t.hero.subtitle}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-base px-8">
                <a href="https://virtualsim.io" target="_blank" rel="noopener noreferrer">
                  {t.hero.cta}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8">
                <Link href={`/${locale}/services`}>
                  {t.hero.secondary}
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '500K+', label: t.stats.users },
              { value: '50+', label: t.stats.countries },
              { value: '500+', label: t.stats.services },
              { value: '1M+', label: t.stats.sms },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold">{t.services.title}</h2>
              <p className="mt-2 text-muted-foreground">{t.services.subtitle}</p>
            </div>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t.services.viewAll}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale as Locale}
                buttonText={t.services.getNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold">{t.countries.title}</h2>
              <p className="mt-2 text-muted-foreground">{t.countries.subtitle}</p>
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
            {countries.slice(0, 6).map((country) => (
              <CountryCard key={country.id} country={country} locale={locale as Locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t.features.title}</h2>
            <p className="mt-2 text-muted-foreground">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ZapIcon, ...t.features.instant },
              { icon: ShieldIcon, ...t.features.secure },
              { icon: HeadphonesIcon, ...t.features.support },
              { icon: TagIcon, ...t.features.price },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-foreground p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-background">{t.cta.title}</h2>
            <p className="mt-4 text-lg text-background/70">{t.cta.subtitle}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 text-base px-8">
              <a href="https://virtualsim.io" target="_blank" rel="noopener noreferrer">
                {t.cta.button}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
