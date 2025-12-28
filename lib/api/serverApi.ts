import { cookies } from 'next/headers';
import axios, { type AxiosResponse } from 'axios';
import { nextServer } from '@/lib/api/api';
import type { FetchNotesParams, FetchNotesResponse } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get('/notes', {
    params,
    headers: await getCookieHeader(),
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const { data } = await nextServer.get(`/notes/${id}`, {
      headers: await getCookieHeader(),
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
    headers: await getCookieHeader(),
  });
  return data;
};

export const checkServerSession = async (): Promise<
  AxiosResponse<{ success: boolean }>
> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<{ success: boolean }>('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};
