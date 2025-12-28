import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

interface FilteredNotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag =
    resolvedParams.slug?.[0] === 'all' ? 'All' : resolvedParams.slug?.[0];
  const capitalizedTag = tag
    ? tag.charAt(0).toUpperCase() + tag.slice(1)
    : 'Notes';

  const title = `${capitalizedTag} Notes | NoteHub`;
  const description = `Browse and manage your notes filtered by the '${capitalizedTag}' tag.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://09-auth-two-iota.vercel.app/notes/filter/${
        tag?.toLowerCase() || 'all'
      }`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const resolvedParams = await params;

  const queryClient = new QueryClient();
  const tag =
    resolvedParams.slug?.[0] === 'all' ? undefined : resolvedParams.slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag || ''],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
