import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createSongInfoSlice, { ISongInfo } from "@zustand/slices/song/createSongInfo.ts";
import createSongIndexSlice, { ISongIndex } from "@zustand/slices/song/createSongIndex.ts";
import createRepeatAndLoopSlice, { IRepeatAndLoop } from "@zustand/slices/repeat-and-loop/createRepeatAndLoop.ts";
import createSongIndexAndShuffleList, { ICreateSongIndexAndShuffleList } from "@zustand/multiple-updates/song-index-and-shuffle-list.ts";

type TUseZustandStore = ISongInfo & ISongIndex & IRepeatAndLoop & ICreateSongIndexAndShuffleList;

const useZustandStore = create<TUseZustandStore>()(devtools((...a) => ({
  ...createSongInfoSlice(...a),
  ...createSongIndexSlice(...a),
  ...createRepeatAndLoopSlice(...a),
  ...createSongIndexAndShuffleList(...a),
})));

export default useZustandStore;
