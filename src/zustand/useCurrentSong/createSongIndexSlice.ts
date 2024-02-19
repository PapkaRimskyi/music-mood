import { StateCreator } from 'zustand';

import { ISearch } from "../../api/interfaces.ts";

export interface ISongIndex {
  currentSongId: number | null,
  isCurrentSongFirst: (data: ISearch[]) => boolean,
  changeCurrentSong: (currentSong: number) => void,
  isCurrentSongLast: (data: ISearch[]) => boolean,
}

const createSongIndexSlice: StateCreator<ISongIndex> = (set, get) => ({
  currentSongId: null,
  isCurrentSongFirst: (data: ISearch[]) => data.findIndex((item) => Number(item.id) === get().currentSongId) === 0,
  changeCurrentSong: (currentSong: number) => set({ currentSongId: currentSong }),
  isCurrentSongLast: (data: ISearch[]) => data.findIndex((item) => Number(item.id) === get().currentSongId) === data.length,
});

export default createSongIndexSlice;
