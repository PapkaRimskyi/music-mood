import { StateCreator } from 'zustand';

import { ISearch } from "@src/api/interfaces.ts";

export interface ISongIndex {
  currentSongId: number | null,
  isCurrentSongFirst: (data: ISearch[]) => boolean,
  setPreviousSongId: (data: ISearch[]) => void,
  changeCurrentSong: (currentSong: number) => void,
  isCurrentSongLast: (data: ISearch[]) => boolean,
  setNextSongId: (data: ISearch[]) => void,
}

const createSongIndex: StateCreator<ISongIndex> = (set, get) => ({
  currentSongId: null,
  isCurrentSongFirst: (data: ISearch[]) => data.findIndex((item) => Number(item.id) === get().currentSongId) === 0,
  setPreviousSongId: (data: ISearch[]) => {
    if (!get().isCurrentSongFirst(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentSongId) - 1].id;
      set({ currentSongId: Number(nextSongId) });
    }
  },
  changeCurrentSong: (currentSong: number) => set({ currentSongId: currentSong }),
  isCurrentSongLast: (data: ISearch[]) => data.findIndex((item) => Number(item.id) === get().currentSongId) === data.length - 1,
  setNextSongId: (data: ISearch[]) => {
    if (!get().isCurrentSongLast(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentSongId) + 1].id;
      set({ currentSongId: Number(nextSongId) });
    }
  }
});

export default createSongIndex;
