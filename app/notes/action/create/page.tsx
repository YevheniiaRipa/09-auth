import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Create a New Note | NoteHub',
  description: 'Add a new note to your personal collection on NoteHub.',
  openGraph: {
    title: 'Create a New Note | NoteHub',
    description: 'Add a new note to your personal collection on NoteHub.',
    url: 'https://08-zustand-sepia-two.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Application',
      },
    ],
    type: 'website',
  },
};
export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
