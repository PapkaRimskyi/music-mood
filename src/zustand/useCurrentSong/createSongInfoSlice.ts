import { StateCreator } from "zustand";

import { DEFAULT_AUDIO_STATE } from "../../const/common.ts";

export interface ISongInfo {
  currentSongInfo: typeof DEFAULT_AUDIO_STATE,
  updateSong: (currentTime: number, duration?: number, playState?: boolean) => void,
}

const createSongInfoSlice: StateCreator<ISongInfo> = (set) => ({
  currentSongInfo: { ...DEFAULT_AUDIO_STATE },
  updateSong: (time: number, duration?: number, playState?: boolean) => set(({ currentSongInfo }) => ({ currentSongInfo: { time, duration: duration || currentSongInfo.duration, playState: playState || currentSongInfo.playState }  })),
})

export default createSongInfoSlice;
