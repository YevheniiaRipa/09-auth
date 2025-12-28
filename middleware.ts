// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Маршрути, доступні тільки для авторизованих користувачів
const privateRoutes = ['/profile', '/notes'];
// Маршрути, доступні тільки для НЕавторизованих користувачів
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  // Отримуємо токен доступу з cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // Отримуємо шлях, на який намагається перейти користувач
  const { pathname } = request.nextUrl;

  // Перевіряємо, чи є поточний маршрут приватним
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Перевіряємо, чи є поточний маршрут сторінкою автентифікації
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // --- Основна логіка захисту ---

  // 1. Якщо користувач НЕ авторизований (немає токену)
  if (!accessToken) {
    // і намагається зайти на приватну сторінку...
    if (isPrivateRoute) {
      // ...перенаправляємо його на сторінку логіну.
      // request.url зберігає повну URL-адресу, включаючи домен.
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // 2. Якщо користувач ВЖЕ авторизований (є токен)
  if (accessToken) {
    // і намагається зайти на сторінку логіну або реєстрації...
    if (isAuthRoute) {
      // ...перенаправляємо його на сторінку профілю, бо йому не потрібно знову логінитися.
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  // 3. В усіх інших випадках (наприклад, неавторизований на публічній сторінці
  //    або авторизований на приватній) - нічого не робимо і дозволяємо доступ.
  return NextResponse.next();
}

// Конфігурація: вказуємо, для яких саме маршрутів має спрацьовувати цей middleware.
// Це оптимізація, щоб не запускати його для запитів до зображень, стилів тощо.
export const config = {
  matcher: [
    '/profile/:path*', // Всі вкладені сторінки профілю
    '/notes/:path*', // Всі вкладені сторінки нотаток
    '/sign-in',
    '/sign-up',
  ],
};
