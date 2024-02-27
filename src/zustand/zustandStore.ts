import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createAudioInfoSlice, { IAudioInfo } from "@zustand/slices/audio/createAudioInfo.ts";
import createAudioIndexSlice, { IAudioIndex } from "@zustand/slices/audio/createAudioIndex.ts";
import createRepeatAndLoopSlice, { IRepeatAndLoop } from "@zustand/slices/repeat-and-loop/createRepeatAndLoop.ts";
import createAudioIndexAndShuffledList, { ICreateAudioIndexAndShuffledList } from "@zustand/multiple-updates/audio-index-and-shuffle-list.ts";

type TUseZustandStore = IAudioInfo & IAudioIndex & IRepeatAndLoop & ICreateAudioIndexAndShuffledList;

const useZustandStore = create<TUseZustandStore>()(devtools((...a) => ({
  ...createAudioInfoSlice(...a),
  ...createAudioIndexSlice(...a),
  ...createRepeatAndLoopSlice(...a),
  ...createAudioIndexAndShuffledList(...a),
})));

export default useZustandStore;
