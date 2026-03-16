import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Page not found / Страница не найдена
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/ru">Главная (RU)</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/en">Home (EN)</Link>
        </Button>
      </div>
    </div>
  )
}
