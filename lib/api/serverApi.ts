// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import axios, { type AxiosResponse } from 'axios';
import { nextServer } from '@/lib/api/api';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

// === ПОЧАТОК ВИПРАВЛЕННЯ ===

// 1. Робимо функцію 'async'
const getCookieHeader = async () => {
  // 2. Додаємо 'await', щоб отримати реальний об'єкт, а не Promise
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

// === КІНЕЦЬ ВИПРАВЛЕННЯ ===

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get('/notes', {
    params,
    headers: await getCookieHeader(), // Тепер тут теж потрібен await
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const { data } = await nextServer.get(`/notes/${id}`, {
      headers: await getCookieHeader(), // І тут
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getServerMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me', {
    headers: await getCookieHeader(), // І тут
  });
  return data;
};

// Функція checkSession не використовує getCookieHeader, але ми її теж виправимо для консистентності
export const checkServerSession = async (): Promise<
  AxiosResponse<{ success: boolean }>
> => {
  const cookieStore = await cookies(); // Додаємо await і тут
  const response = await nextServer.get<{ success: boolean }>('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};
