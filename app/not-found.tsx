import type { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https:/08-zustand-sepia-two.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

function NotFound() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className={css.link}>
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
