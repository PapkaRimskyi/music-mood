import { StateCreator } from 'zustand';

import { ISearch } from "@src/api/interfaces.ts";

type AudioDataType = ISearch[] | undefined;

export interface IAudioIndex {
  currentAudioId: number | null,
  isCurrentAudioFirst: (data: AudioDataType) => boolean,
  setPreviousAudioId: (data: AudioDataType) => void,
  changeCurrentAudio: (currentSong: number | null) => void,
  isCurrentAudioLast: (data: AudioDataType) => boolean,
  setNextAudioId: (data: AudioDataType) => void,
}

const createAudioIndex: StateCreator<IAudioIndex, [["zustand/devtools", never]]> = (set, get) => ({
  currentAudioId: null,
  isCurrentAudioFirst: (data: AudioDataType) => !data ? true : data.findIndex((item) => Number(item.id) === get().currentAudioId) === 0,
  setPreviousAudioId: (data: AudioDataType) => {
    if (data && !get().isCurrentAudioFirst(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentAudioId) - 1].id;
      set({ currentAudioId: Number(nextSongId) }, false, "setPreviousAudioId");
    }
  },
  changeCurrentAudio: (currentSong: number | null) => set({ currentAudioId: currentSong }, false, "changeCurrentAudio"),
  isCurrentAudioLast: (data: AudioDataType) => !data ? true : data.findIndex((item) => Number(item.id) === get().currentAudioId) === data.length - 1,
  setNextAudioId: (data: AudioDataType) => {
    if (data && !get().isCurrentAudioLast(data)) {
      const nextSongId = data[data.findIndex((item) => Number(item.id) === get().currentAudioId) + 1].id;
      set({ currentAudioId: Number(nextSongId) }, false, "setNextAudioId");
    }
  }
});

export default createAudioIndex;
