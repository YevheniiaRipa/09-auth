import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNote } from '@/lib/api';

type NoteDraft = Omit<NewNote, 'tag'> & { tag: string };

interface NoteDraftStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      setDraft: newDraftData =>
        set({ draft: { ...get().draft, ...newDraftData } }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
