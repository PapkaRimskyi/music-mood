import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createSongInfoSlice, { ISongInfo } from "./createSongInfoSlice.ts";
import createSongIndexSlice, { ISongIndex } from "./createSongIndexSlice.ts";

const useCurrentSong = create<ISongInfo & ISongIndex>()(devtools((...a) => ({
  ...createSongInfoSlice(...a),
  ...createSongIndexSlice(...a),
})));

export default useCurrentSong;
