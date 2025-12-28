import { nextServer } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await nextServer.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete(`/notes/${id}`);
  return data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (userData: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post('/auth/register', userData);
  return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const { data } = await nextServer.get<{ success: boolean }>(
      '/auth/session'
    );
    return data.success;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me');
  return data;
};

export type UpdateUserRequest = Partial<Pick<User, 'username'>>;

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await nextServer.put('/users/me', payload);
  return data;
};
