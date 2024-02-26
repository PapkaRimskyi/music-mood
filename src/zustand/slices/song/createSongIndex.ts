import { StateCreator } from 'zustand';

import { ISearch } from "@src/api/interfaces.ts";

type SongDataType = ISearch[] | undefined;

export interface ISongIndex {
  currentSongId: number | null,
  isCurrentSongFirst: (data: SongDataType) => boolean,
  setPreviousSongId: (data: SongDataType) => void,
  changeCurrentSong: (currentSong: number | null) => void,
  isCurrentSongLast: (data: SongDataType) => boolean,
  setNextSongId: (data: SongDataType) => void,
}

const createSongIndex: StateCreator<ISongIndex> = (set, get) => ({
  currentSongId: null,
  isCurrentSongFirst: (data: SongDataType) => !data ? true : data.findIndex((item) => Number(item.id) === get().currentSongId) === 0,
  setPreviousSongId: (data: SongDataType) => {
    if (data && !get().isCurrentSongFirst(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentSongId) - 1].id;
      set({ currentSongId: Number(nextSongId) });
    }
  },
  changeCurrentSong: (currentSong: number | null) => set({ currentSongId: currentSong }),
  isCurrentSongLast: (data: SongDataType) => !data ? true : data.findIndex((item) => Number(item.id) === get().currentSongId) === data.length - 1,
  setNextSongId: (data: SongDataType) => {
    if (data && !get().isCurrentSongLast(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentSongId) + 1].id;
      set({ currentSongId: Number(nextSongId) });
    }
  }
});

export default createSongIndex;
