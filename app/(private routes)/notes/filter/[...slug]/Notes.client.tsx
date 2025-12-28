'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

interface NotesClientProps {
  initialTag?: string;
}

function NotesClient({ initialTag }: NotesClientProps) {
  const params = useParams();

  const tag = Array.isArray(params.slug)
    ? params.slug[0] === 'all'
      ? undefined
      : params.slug[0]
    : initialTag;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { data: notesData } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchTerm, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: debouncedSearchTerm,
        tag: tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const notes = notesData?.notes || [];
  const totalPages = notesData?.totalPages || 0;

  return (
    <div className={css.app}>
      <Toaster gutter={8} />{' '}
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;
