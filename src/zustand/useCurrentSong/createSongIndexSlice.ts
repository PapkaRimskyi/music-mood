import { StateCreator } from 'zustand';

import { ISearch } from "../../api/interfaces.ts";

export interface ISongIndex {
  currentSongIndex: number,
  changeCurrentSong: (newSong: number) => void,
  isCurrentSongFirst: () => boolean,
  isCurrentSongLast: (data: ISearch[]) => boolean,
}

const createSongIndexSlice: StateCreator<ISongIndex> = (set, get) => ({
  currentSongIndex: 0,
  isCurrentSongFirst: () => get().currentSongIndex === 0,
  isCurrentSongLast: (data: ISearch[]) => get().currentSongIndex === data.length,
  changeCurrentSong: (newSong: number) => set({ currentSongIndex: newSong }),
});

export default createSongIndexSlice;
