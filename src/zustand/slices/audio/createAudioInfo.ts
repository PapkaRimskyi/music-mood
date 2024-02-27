import { StateCreator } from "zustand";

import { DEFAULT_AUDIO_STATE } from "@src/const/common.ts";

export interface IAudioInfo {
  currentAudioInfo: typeof DEFAULT_AUDIO_STATE,
  updateCurrentAudioInfo: (currentTime: number, duration?: number) => void,
  currentAudioPlayState: boolean,
  updateCurrentAudioPlayState: (newPlayState?: boolean) => void,
}

const createAudioInfo: StateCreator<IAudioInfo> = (set, get) => ({
  currentAudioInfo: { ...DEFAULT_AUDIO_STATE },
  updateCurrentAudioInfo: (time: number, duration?: number) => set(({ currentAudioInfo }) => ({ currentAudioInfo: { time, duration: duration || currentAudioInfo.duration }  })),
  currentAudioPlayState: false,
  updateCurrentAudioPlayState: (newPlayState?: boolean) => set({ currentAudioPlayState: newPlayState !== undefined ? newPlayState : !get().currentAudioPlayState }),
})

export default createAudioInfo;
