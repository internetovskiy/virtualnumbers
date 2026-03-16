export const locales = ['ru', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'

export const translations = {
  ru: {
    meta: {
      title: 'Виртуальные Номера для SMS Верификации | Купить Номер Онлайн',
      description: 'Получите виртуальные номера для регистрации в Telegram, WhatsApp, Google и других сервисах. Мгновенная активация, низкие цены, 50+ стран.',
    },
    nav: {
      home: 'Главная',
      services: 'Сервисы',
      countries: 'Страны',
      pricing: 'Цены',
      getNumber: 'Получить номер',
    },
    hero: {
      badge: 'Лидер рынка виртуальных номеров',
      title: 'Виртуальные номера для любых задач',
      subtitle: 'Мгновенная активация номеров для SMS верификации. Поддержка 500+ сервисов и 50+ стран мира.',
      cta: 'Начать сейчас',
      secondary: 'Узнать больше',
    },
    stats: {
      users: 'Пользователей',
      countries: 'Стран',
      services: 'Сервисов',
      sms: 'SMS в день',
    },
    services: {
      title: 'Популярные сервисы',
      subtitle: 'Выберите сервис для получения виртуального номера',
      viewAll: 'Все сервисы',
      getNumber: 'Получить номер',
    },
    countries: {
      title: 'Доступные страны',
      subtitle: 'Номера из более чем 50 стран мира',
      viewAll: 'Все страны',
      numbers: 'номеров',
      from: 'от',
    },
    features: {
      title: 'Почему выбирают нас',
      subtitle: 'Надёжный сервис с лучшими условиями на рынке',
      instant: {
        title: 'Мгновенная активация',
        description: 'Номер готов к использованию сразу после оплаты',
      },
      secure: {
        title: 'Безопасность',
        description: 'Защита данных и анонимность гарантированы',
      },
      support: {
        title: 'Поддержка 24/7',
        description: 'Помощь в любое время дня и ночи',
      },
      price: {
        title: 'Лучшие цены',
        description: 'Конкурентные цены и гибкая система скидок',
      },
    },
    cta: {
      title: 'Готовы начать?',
      subtitle: 'Получите виртуальный номер прямо сейчас',
      button: 'Перейти к сервису',
    },
    footer: {
      description: 'Надёжный сервис виртуальных номеров для SMS верификации',
      services: 'Сервисы',
      countries: 'Страны',
      company: 'Компания',
      about: 'О нас',
      contact: 'Контакты',
      terms: 'Условия',
      privacy: 'Конфиденциальность',
      rights: 'Все права защищены',
    },
  },
  en: {
    meta: {
      title: 'Virtual Phone Numbers for SMS Verification | Buy Number Online',
      description: 'Get virtual numbers for Telegram, WhatsApp, Google and other services registration. Instant activation, low prices, 50+ countries.',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      countries: 'Countries',
      pricing: 'Pricing',
      getNumber: 'Get Number',
    },
    hero: {
      badge: 'Market Leader in Virtual Numbers',
      title: 'Virtual numbers for any task',
      subtitle: 'Instant activation of numbers for SMS verification. Support for 500+ services and 50+ countries worldwide.',
      cta: 'Get Started',
      secondary: 'Learn More',
    },
    stats: {
      users: 'Users',
      countries: 'Countries',
      services: 'Services',
      sms: 'SMS per day',
    },
    services: {
      title: 'Popular Services',
      subtitle: 'Choose a service to get a virtual number',
      viewAll: 'All Services',
      getNumber: 'Get Number',
    },
    countries: {
      title: 'Available Countries',
      subtitle: 'Numbers from more than 50 countries',
      viewAll: 'All Countries',
      numbers: 'numbers',
      from: 'from',
    },
    features: {
      title: 'Why Choose Us',
      subtitle: 'Reliable service with the best market conditions',
      instant: {
        title: 'Instant Activation',
        description: 'Number is ready to use immediately after payment',
      },
      secure: {
        title: 'Security',
        description: 'Data protection and anonymity guaranteed',
      },
      support: {
        title: '24/7 Support',
        description: 'Help available any time of day or night',
      },
      price: {
        title: 'Best Prices',
        description: 'Competitive prices and flexible discount system',
      },
    },
    cta: {
      title: 'Ready to start?',
      subtitle: 'Get a virtual number right now',
      button: 'Go to Service',
    },
    footer: {
      description: 'Reliable virtual number service for SMS verification',
      services: 'Services',
      countries: 'Countries',
      company: 'Company',
      about: 'About',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy',
      rights: 'All rights reserved',
    },
  },
} as const

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getTranslations(locale: string) {
  const validLocale = isValidLocale(locale) ? locale : defaultLocale
  return translations[validLocale]
}
